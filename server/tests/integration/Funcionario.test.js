const FuncionarioController = require('../../src/controller/FuncionarioController');
const Funcionario = require('../../src/model/Funcionario');

describe('Funcionario Integration Tests', () => {
    describe('RT07 - Criação do usuário', () => {
        it('CT17: Validar se salva colaborador com nome vazio', async () => {
            const res = await FuncionarioController.createFuncionario({ nome: '', email: 'tobias@email.com', password: 'SenhaTobias123' });

            expect(res.status).toBe(400); // Bad Request
            expect(res.body.error).toBe('Nome precisa ser informado');
        });

        it('CT18: Validar se salva colaborador com email inválido', async () => {
            const res = await FuncionarioController.createFuncionario({ nome: 'Tobias', email: 'email@444', password: 'SenhaTobias123' });

            expect(res.status).toBe(400); // Bad Request
            expect(res.body.error).toBe('Email inválido');
        });

        it('CT19: Validar se salva colaborador com email já existente', async () => {
            const existingFuncionario = await Funcionario.funcionarioById(1);
            if (!existingFuncionario) {
                await FuncionarioController.createFuncionario({ nome: 'Tobias Existente', email: 'emailjacadastradonobanco@email.com', password: 'SenhaExistente123' });
            }

            const res = await FuncionarioController.createFuncionario({ nome: 'Tobias', email: 'emailjacadastradonobanco@email.com', password: 'SenhaTobias123' });

            expect(res.status).toBe(400); // Bad Request
            expect(res.body.error).toBe('Email já cadastrado');
        });

        it('CT20: Validar se salva colaborador com senha fraca', async () => {
            const res = await FuncionarioController.createFuncionario({ nome: 'Tobias', email: 'tobias@email.com', password: '2024' });

            expect(res.status).toBe(400); // Bad Request
            expect(res.body.error).toBe('Senha fraca');
        });

        it('CT21: Validar se salva colaborador com dados corretos', async () => {
            const res = await FuncionarioController.createFuncionario({ nome: 'Tobias', email: 'tobias@email.com', password: 'SenhaTobias2024' });

            expect(res.status).toBe(201); // Created
            expect(res.body.message).toBe('Colaborador cadastrado com sucesso');
        });
    });

    describe('RT08 - Alteração do usuário', () => {
        it('CT22: Validar se salva colaborador com novo nome vazio', async () => {
            const res = await FuncionarioController.updateFuncionario(1, { nome: '', email: 'tobias@email.com', password: 'SenhaTobias123' });

            expect(res.status).toBe(400); // Bad Request
            expect(res.body.error).toBe('Nome precisa ser informado');
        });

        it('CT23: Validar se salva colaborador com nova senha fraca', async () => {
            const res = await FuncionarioController.updateFuncionario(1, { nome: 'Tobias', email: 'tobias@email.com', password: '123' });

            expect(res.status).toBe(400); // Bad Request
            expect(res.body.error).toBe('Senha fraca');
        });

        it('CT24: Validar se salva colaborador com novos dados corretos', async () => {
            const res = await FuncionarioController.updateFuncionario(1, { nome: 'Tobias Felipe Kiefer', email: 'tobias@email.com', password: '123TobiasSenha' });

            expect(res.status).toBe(200); // OK
            expect(res.body.message).toBe('Dados do colaborador atualizados com sucesso');
        });
    });
});