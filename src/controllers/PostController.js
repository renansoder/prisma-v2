import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async createPost(req, res) {
    const { content } = req.body;
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.json({ message: 'Usuário não cadastrado!' });
      }
      const post = await prisma.post.create({
        data: {
          content,
          userId: user.id
        }
      });
      return res.json(post);
    } catch (error) {
      return res.json({ error_msg: error.message });
    }
  },

  async findAllPosts(req, res) {
    try {
      const posts = await prisma.post.findMany();
      return res.json(posts);
    } catch (error) {
      return res.json({ error_msg: error.message });
    }
  },

  async updatePost(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    try {
      let post = await prisma.post.findUnique({ where: { id: Number(id) } });
      if (!post) {
        return res.json({ message: 'Post não encontrado!' });
      }
      post = await prisma.post.update({
        where: { id: Number(id) },
        data: { content }
      });
      return res.json(post);
    } catch (error) {
      return res.json({ error_msg: error.message });
    }
  },

  async deletePost(req, res) {
    const { id } = req.params;
    try {
      let post = await prisma.post.findUnique({ where: { id: Number(id) } });
      if (!post) {
        return res.json({ message: 'Post não encontrado!' });
      }
      await prisma.post.delete({ where: { id: Number(id) } });
      return res.json({ success_msg: 'Post excluído!' });
    } catch (error) {
      return res.json({ error_msg: error.message });
    }
  }
};
