const modelReposicao = require('../model/Reposicao');

// Validações de entrada
const validateReposicao = (status_reposicao, id_itemestoque, data_reposicao, id_totem) => {
    const errors = [];

    // Data de reposição não pode ser no passado
    if (new Date(data_reposicao) < new Date()) {
        errors.push('A data de reposição deve ser maior ou igual ao dia atual.');
    }
    
    // Totem deve ser informado
    if (!id_totem) {
        errors.push('O totem deve ser informado.');
    }
    
    // Item de estoque deve ser informado
    if (!id_itemestoque) {
        errors.push('O item de estoque deve ser informado.');
    }
    
    // Status deve ser informado
    if (!status_reposicao) {
        errors.push('O status deve ser informado.');
    }

    return errors;
};

exports.createReposicao = async (req, res) => {
    const { status_reposicao, observacao_reposicao, id_itemestoque, data_reposicao, id_totem } = req.body;

    // Verifica as validações
    const errors = validateReposicao(status_reposicao, id_itemestoque, data_reposicao, id_totem);
    if (errors.length > 0) {
        return res.status(400).json({ message: errors.join(' ') });
    }

    try {
        const { data, error } = await modelReposicao.createReposicao(status_reposicao, observacao_reposicao, id_itemestoque, data_reposicao, id_totem);
        if (error) {
            if (error === 'Totem não encontrado' || error === 'Item de estoque não encontrado') {
                return res.status(404).json({ message: error });
            }
            throw new Error(error);
        }
        res.status(201).json({ message: 'Reposição criada com sucesso!', data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReposicao = async (req, res) => {
    const { id_reposicao, status_reposicao, observacao_reposicao, id_itemestoque, data_reposicao, id_totem } = req.body;

    // Verifica as validações
    const errors = validateReposicao(status_reposicao, id_itemestoque, data_reposicao, id_totem);
    if (errors.length > 0) {
        return res.status(400).json({ message: errors.join(' ') });
    }

    try {
        const { data, error } = await modelReposicao.updateReposicao(id_reposicao, status_reposicao, observacao_reposicao, id_itemestoque, data_reposicao, id_totem);
        if (error) {
            if (error === 'Totem não encontrado' || error === 'Item de estoque não encontrado') {
                return res.status(404).json({ message: error });
            }
            throw new Error(error);
        }
        res.status(200).json({ message: 'Reposição atualizada com sucesso!', data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listaReposicao = async (req, res) => {
    try {
        const { data, error } = await modelReposicao.listaReposicao();
        if (error) throw new Error(error);
        res.status(200).json({ message: 'Encontrado!', data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.reposicaoById = async (req, res) => {
    const { id_reposicao } = req.params;
    try {
        const { data, error } = await modelReposicao.reposicaoById(id_reposicao);
        if (error) throw new Error(error);
        res.status(200).json({ message: 'Encontrado!', data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
