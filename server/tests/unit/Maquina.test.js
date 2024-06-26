const { createMaquina, updateMaquina } = require('../../src/model/Maquina');

describe('Maquina Model Unit Tests', () => {
    test('CT04: Validar se novo local da máquina está vazio', async () => {
        const { data, error } = await createMaquina('Disponível', '');
        expect(error).not.toBeNull();
        expect(error.message).toBe('Local não pode ser vazio');
    });

    test('CT05: Validar se alterou o local da máquina', async () => {
        const { data, error } = await updateMaquina(1, 'Disponível', 'Ibirama - Centro');
        expect(error).toBeNull();
        expect(data).not.toBeNull();
    });

    test('CT06: Validar se alterou o status da máquina', async () => {
        const { data, error } = await updateMaquina(1, 'Disponível', 'Local Atual');
        expect(error).toBeNull();
        expect(data).not.toBeNull();
        expect(data[0].status_maquina).toBe('Disponível');
    });

    test('CT07: Validar se alterou o status da máquina com um status diferente do atual', async () => {
        const { data, error } = await updateMaquina(1, 'Em Manutenção', 'Local Atual');
        expect(error).toBeNull();
        expect(data).not.toBeNull();
        expect(data[0].status_maquina).toBe('Em Manutenção');
    });

    test('CT08: Validar se cadastrou uma máquina', async () => {
        const { data, error } = await createMaquina('Disponível', 'Timbó - Centro');
        expect(error).toBeNull();
        expect(data).not.toBeNull();
        expect(data[0].status_maquina).toBe('Disponível');
        expect(data[0].local_maquina).toBe('Timbó - Centro');
    });
});