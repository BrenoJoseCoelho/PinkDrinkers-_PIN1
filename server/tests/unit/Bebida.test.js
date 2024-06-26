const { createBebida, updateBebida } = require('../../src/model/Bebida');

describe('Bebida Model Unit Tests', () => {
    test('CT01: Validar se o nome da bebida foi informado', async () => {
        const { data, error } = await createBebida('', 'refrigerante', 2.50, 'imagem.png');
        expect(error).not.toBeNull();
        expect(error.message).toBe('Nome precisa ser informado');
    });

    test('CT02: Validar se o nome da bebida já existe', async () => {
        await createBebida('Coca-Cola', 'refrigerante', 2.50, 'imagem.png');
        const { data, error } = await createBebida('Coca-Cola', 'refrigerante', 2.50, 'imagem.png');
        expect(error).not.toBeNull();
        expect(error.message).toBe('Bebida já existe.');
    });

    test('CT03: Validar se o valor da bebida é um valor válido', async () => {
        const { data, error } = await updateBebida(1, 'Coca-Cola', 'refrigerante', -2.50, 'imagem.png');
        expect(error).not.toBeNull();
        expect(error.message).toBe('Valor informado não é válido');
    });
});