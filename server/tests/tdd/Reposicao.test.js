const { createReposicao, updateReposicao } = require('../../src/controller/ReposicaoController');
const modelReposicao = require('../../src/model/Reposicao');

jest.mock('../../src/model/Reposicao');

describe('Reposicao', () => {

  describe('createReposicao', () => {
    it('should return error if data_reposicao is in the past', async () => {
      const req = {
        body: {
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: 1,
          data_reposicao: '2023-06-30',
          id_totem: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      await createReposicao(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'A data de reposição deve ser maior ou igual ao dia atual.' });
    });

    it('should return error if id_totem is not provided', async () => {
      const req = {
        body: {
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: 1,
          data_reposicao: '2024-06-30',
          id_totem: null
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'O totem deve ser informado.' });
    });

    it('should return error if id_itemestoque is not provided', async () => {
      const req = {
        body: {
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: null,
          data_reposicao: '2024-06-30',
          id_totem: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'O item de estoque deve ser informado.' });
    });

    it('should return error if status_reposicao is not provided', async () => {
      const req = {
        body: {
          status_reposicao: '',
          observacao_reposicao: '',
          id_itemestoque: 1,
          data_reposicao: '2024-06-30',
          id_totem: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'O status deve ser informado.' });
    });

    it('should return error if id_totem does not exist', async () => {
      modelReposicao.createReposicao.mockResolvedValue({ data: null, error: 'Totem não encontrado' });

      const req = {
        body: {
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: 1,
          data_reposicao: '2024-06-30',
          id_totem:43
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Totem não encontrado' });
    });

    it('should return error if id_itemestoque does not exist', async () => {
      modelReposicao.createReposicao.mockResolvedValue({ data: null, error: 'Item de estoque não encontrado' });

      const req = {
        body: {
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: 111,
          data_reposicao: '2024-06-30',
          id_totem: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Item de estoque não encontrado' });
    });
  });

  describe('updateReposicao', () => {
    it('should return error if data_reposicao is in the past', async () => {
      const req = {
        body: {
          id_reposicao: 1,
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: 1,
          data_reposicao: '2023-06-30',
          id_totem: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      await updateReposicao(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'A data de reposição deve ser maior ou igual ao dia atual.' });
    });

    it('should return error if id_totem is not provided', async () => {
      const req = {
        body: {
          id_reposicao: 1,
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: 1,
          data_reposicao: '2024-06-30',
          id_totem: null
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'O totem deve ser informado.' });
    });

    it('should return error if id_itemestoque is not provided', async () => {
      const req = {
        body: {
          id_reposicao: 1,
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: null,
          data_reposicao: '2024-06-30',
          id_totem: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'O item de estoque deve ser informado.' });
    });

    it('should return error if status_reposicao is not provided', async () => {
      const req = {
        body: {
          id_reposicao: 1,
          status_reposicao: '',
          observacao_reposicao: '',
          id_itemestoque: 1,
          data_reposicao: '2024-06-30',
          id_totem: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'O status deve ser informado.' });
    });

    it('should return error if id_totem does not exist', async () => {
      modelReposicao.updateReposicao.mockResolvedValue({ data: null, error: 'Totem não encontrado' });

      const req = {
        body: {
          id_reposicao: 1,
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: 1,
          data_reposicao: '2024-06-30',
          id_totem: 43
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Totem não encontrado' });
    });

    it('should return error if id_itemestoque does not exist', async () => {
      modelReposicao.updateReposicao.mockResolvedValue({ data: null, error: 'Item de estoque não encontrado' });

      const req = {
        body: {
          id_reposicao: 1,
          status_reposicao: 'EM_ESPERA',
          observacao_reposicao: '',
          id_itemestoque: 111,
          data_reposicao: '2024-06-30',
          id_totem: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateReposicao(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Item de estoque não encontrado' });
    });
  });
});