import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async createUser(req, res) {
    try {
      const { name, email } = req.body;

      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        return res.json({ error: 'Email já cadastrado!' });
      }

      user = await prisma.user.create({
        data: {
          name,
          email
        }
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error_msg: error });
    }
  },

  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.json({ error_msg: error });
    }
  },

  async findOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.json({ error: 'Usuário inexistente!' });
      }
      return res.json(user);
    } catch (error) {
      return res.json({ error_msg: error });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      let user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.json({ error: 'Usuário não cadastrado!' });
      }

      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email }
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error_msg: error });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.json({ error: 'Usuário não encontrado!' });
      } else {
        await prisma.user.delete({ where: { id: Number(id) } });
        return res.json({ success_msg: 'Usuário excluído!' });
      }
    } catch (error) {
      return res.json({ error_msg: error });
    }
  }
};
