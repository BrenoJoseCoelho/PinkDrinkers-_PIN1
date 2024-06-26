const { supabase } = require('../database');
const modelmaquina = require('../model/Maquina');


exports.createMaquina = async (req, res) => {
// Chama o metodo createMaquina do modelo 
  const {status_maquina, local_maquina } = req.body;

  try {
   const {data, error} = await modelmaquina.createMaquina(status_maquina, local_maquina);

   if (data && data.length) {
    res.status(201).json({
      message: 'Maquina Criada com sucesso!',
      data
    });
  } else {
    throw Error('Erro ao Criar Maquina!')
  }
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

exports.updateMaquina = async (req, res) => {
    const {id_maquina,status_maquina, local_maquina} = req.body;
  
    try {
     const {data, error} = await modelmaquina.updateMaquina(id_maquina,status_maquina, local_maquina);
     if (data && data.length) {
      res.status(201).json({
        message: 'Maquina editada com sucesso!',
        data
      });
    } else {
      throw Error('Erro ao editar Maquina!')
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  };

  exports.selectMaquina = async (req, res) => {

    try {
        const { data, error } = await modelmaquina.selectMaquina();

        if (data && data.length) {
            res.status(200).json({
                message: 'Encontrado!', data
            });
        } else {
            throw Error('Não encontrado dados!')
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

  exports.maquinaById = async (req, res) => {
    const {id_maquina} = req.params;
    try {
        const { data, error } = await modelmaquina.maquinaById(id_maquina);
        if (data && data.length) {
            res.status(200).json({
                message: 'Econtrado!', data
            });
        } else {
            throw Error('Não encontrado dados!')
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};