import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:orgSlug/projects/:projectSlug',
      {
        schema: {
          tags: ['projects'],
          summary: 'Get project details',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orgSlug: z.string(),
            projectSlug: z.uuid(),
          }),
          response: {
            200: z.object({
              project: z.object({
                name: z.string(),
                id: z.uuid(),
                slug: z.string(),
                avatarUrl: z.url().nullable(),
                ownerId: z.uuid(),
                organizationId: z.uuid(),
                description: z.string(),
                owner: z.object({
                  id: z.uuid(),
                  name: z.string().nullable(),
                  avatarUrl: z.url().nullable(),
                }),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { orgSlug, projectSlug } = request.params

        const userId = await request.getCurrentUserId()

        const { organization, membership } =
          await request.getUserMembership(orgSlug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'Project')) {
          throw new UnauthorizedError("You're not allowed to see this project.")
        }

        const project = await prisma.project.findUnique({
          select: {
            id: true,
            name: true,
            description: true,
            slug: true,
            ownerId: true,
            avatarUrl: true,
            organizationId: true,
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            slug: projectSlug,
            organizationId: organization.id,
          },
        })

        if (!project) {
          throw new BadRequestError('Project not found.')
        }

        return reply.status(200).send({ project })
      }
    )
}
