const modelBebida = require('../model/Bebida');

exports.createBebida = async (req, res) => {
  const { nome_bebida, tipo_bebida, valor_bebida, imagem_bebida } = req.body;

  try {
    const { data, error } = await modelBebida.createBebida(nome_bebida, tipo_bebida, valor_bebida, imagem_bebida);
    if (data && data.length) {
      res.status(201).json({
        message: 'Bebida criada com sucesso!',
        data,
      });
    } else {
      throw new Error('Erro ao criar bebida!');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBebida = async (req, res) => {
  const { id_bebida, nome_bebida, tipo_bebida, valor_bebida, imagem_bebida } = req.body;

  try {
    const { data, error } = await modelBebida.updateBebida(id_bebida, nome_bebida, tipo_bebida, valor_bebida, imagem_bebida);
    if (data && data.length) {
      res.status(200).json({
        message: 'Bebida atualizada com sucesso!',
        data,
      });
    } else {
      throw new Error('Erro ao atualizar bebida!');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.selectBebida = async (req, res) => {
  const { id_bebida } = req.params;

  try {
    const { data, error } = await modelBebida.selectBebida(id_bebida);
    if (data && data.length) {
      res.status(200).json({
        message: 'Bebida encontrada!',
        data,
      });
    } else {
      throw new Error('Bebida não encontrada!');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
