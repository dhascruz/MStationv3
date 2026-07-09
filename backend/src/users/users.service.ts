import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(data: { name: string; email: string; passwordHash: string }) {
    return this.prisma.user.create({ data });
  }

  /**
   * Every signup lands on Novice by default. Novice has no Stripe object —
   * it's just the default Plan a new User is subscribed to locally until
   * they upgrade through Stripe Checkout.
   */
  async createWithDefaultPlan(data: { name: string; email: string; passwordHash: string }) {
    const user = await this.create(data);

    const novice = await this.prisma.plan.findUnique({ where: { key: "novice" } });
    if (novice) {
      await this.prisma.subscription.create({
        data: {
          userId: user.id,
          planId: novice.id,
          stripeCustomerId: `local_${user.id}`,
          stripeSubscriptionId: `local_${user.id}`,
          status: "active",
          currentPeriodEnd: new Date("2099-01-01"),
        },
      });
    }

    return user;
  }
}
