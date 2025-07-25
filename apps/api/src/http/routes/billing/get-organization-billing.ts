import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getOrganizationBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/billing',
      {
        schema: {
          tags: ['billing'],
          summary: 'Get billing information from organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                projects: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                total: z.number(),
              })
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params

        const userId = await request.getCurrentUserId()

        const { organization, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot("get", "Billing")) {
          throw new UnauthorizedError(`You're not allowed to get billing details from this organization.`)
        }

        const [amountOfMembers, amountOfProjects] = await Promise.all([
          prisma.member.count({
            where: {
              organizationId: organization.id,
              role: {
                not: "BILLING"
              }
            }
          }),

          prisma.project.count({
            where: {
              organizationId: organization.id
            }
          })
        ])

        const UNIT_PER_MEMBER = 10
        const MEMBERS_TOTAL_PRICE = amountOfMembers * UNIT_PER_MEMBER

        const UNIT_PER_PROJECT = 20
        const PROJECTS_TOTAL_PRICE = amountOfProjects * UNIT_PER_PROJECT

        return {
          billing: {
            seats: {
              amount: amountOfMembers,
              unit: UNIT_PER_MEMBER,
              price: MEMBERS_TOTAL_PRICE
            },
            projects: {
              amount: amountOfProjects,
              unit: UNIT_PER_PROJECT,
              price: PROJECTS_TOTAL_PRICE
            },
            total: MEMBERS_TOTAL_PRICE + PROJECTS_TOTAL_PRICE
          },
        }
      }
    )
}
