const { createFuncionario, updateFuncionario } = require('../../src/model/Funcionario');

describe('Funcionario Model Unit Tests', () => {
    test('CT09: Validar se um nome foi informado', async () => {
        const { data, error } = await createFuncionario('', 'tobias@email.com', 'tobias123');
        expect(error).not.toBeNull();
        expect(error.message).toBe('Nome precisa ser informado');
    });

    test('CT10: Validar se email informado é válido', async () => {
        const { data, error } = await createFuncionario('Tobias', 'tobias@teste', 'tobias123');
        expect(error).not.toBeNull();
        expect(error.message).toBe('Email inválido');
    });

    test('CT11: Validar se senha é fraca', async () => {
        const { data, error } = await createFuncionario('Tobias', 'tobias@gmail.com', '123');
        expect(error).not.toBeNull();
        expect(error.message).toBe('Senha fraca');
    });

    test('CT12: Colaborador adicionado com sucesso', async () => {
        const { data, error } = await createFuncionario('Tobias', 'tobias@gmail.com', 'SenhaDoTobias123');
        expect(error).toBeNull();
        expect(data).not.toBeNull();
    });

    test('CT13: Validar se novo nome não é vazio', async () => {
        const { data, error } = await updateFuncionario(1, '', 'tobias@gmail.com', 'SenhaDoTobias123');
        expect(error).not.toBeNull();
        expect(error.message).toBe('Nome precisa ser informado');
    });

    test('CT14: Validar se nova senha é forte', async () => {
        const { data, error } = await updateFuncionario(1, 'Breno', 'tobias@gmail.com', '2022');
        expect(error).not.toBeNull();
        expect(error.message).toBe('Senha fraca');
    });

    test('CT15: Validar se nenhum dado foi alterado', async () => {
        const { data, error } = await updateFuncionario(1, 'Tobias', 'tobias@gmail.com', 'SenhaDoTobias123');
        expect(error).toBeNull();
        expect(data).not.toBeNull();
        // Assuming the update will check for actual changes
    });

    test('CT16: Atualizar cadastro do colaborador', async () => {
        const { data, error } = await updateFuncionario(1, 'Tobias Felipe Kiefer', 'tobias@gmail.com', 'SenhaDoTobias123');
        expect(error).toBeNull();
        expect(data).not.toBeNull();
    });
});