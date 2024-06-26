const { supabase } = require('../database');
const modelfuncionario = require('../model/Funcionario');


exports.createFuncionario = async (req, res) => {

  const { nome, email, password } = req.body;

  try {
    const { data, error } = await modelfuncionario.createFuncionario(nome, email, password);
    if (data && data.length) {
      res.status(201).json({
        message: 'Funcionario Criado com sucesso!',
        data
      });
    } else {
      throw Error('Erro ao Criar Funcionario!')
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFuncionario = async (req, res) => {
  const { id_funcionario, nome, email, password } = req.body;

  try {
    const { data, error } = await modelfuncionario.updateFuncionario(id_funcionario, nome, email, password);
    if (data && data.length) {
      res.status(201).json({
        message: 'Funcionario editado com sucesso!',
        data
      });
    } else {
      throw Error('Erro ao editar Funcionario!')
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.selectFuncionario = async (req, res) => {
  try {
    const { data, error } = await modelfuncionario.selectFuncionarios();
    if (data && data.length) {
      res.status(200).json({
        message: 'Funcionários encontrados com sucesso!',
        data
      });
    } else {
      throw Error('Nenhum funcionário encontrado!');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.funcionarioById = async (req, res) => {
  const {id_funcionario} = req.params;
  try {
      const { data, error } = await modelfuncionario.funcionarioById(id_funcionario);
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
