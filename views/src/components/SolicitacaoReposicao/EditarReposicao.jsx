import React, { useState, useEffect  } from 'react';
import Header from '../Header/Header';
import iconeVoltar from '../util/iconeVoltar.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CadastroStyle.css';
import axios from 'axios';//biblioteca para fazer requisições HTTP em JavaScript
import  {redirect, useParams } from 'react-router-dom';


function EditarSolicitacao() {
// pega id passado
    const { id_reposicao } = useParams();
// monta selects da tela
  const [selectestoque, setSelectEstoque] = useState([]);
  const [selecttotem, setSelectTotem] = useState([]);
//pega valores para salvar no banco
  const [data_reposicao, setStartDate] = useState(new Date());
  const [status_reposicao, setStatus] = useState('');
  const [observacao_reposicao, setObservacao] = useState('');
  const [id_itemestoque, setIdItemEstoque] = useState('');
  const [id_totem, setIdTotem] = useState('');

  const editarSolicitacao = async (e) => {
    e.preventDefault();
    const {data, error} = await axios.post('http://localhost:3001/updatereposicao', {
      id_reposicao,
      status_reposicao,
      observacao_reposicao,
      id_itemestoque,
      data_reposicao,
      id_totem
    });
    console.log(error);
    if(error === 'undefined'){
        return "/gerenciar_reposicao";
    }
    console.log(data);    
  }

  useEffect(() => {

    const consultarbyid = async () => {
        try {
          const data = await axios.get('http://localhost:3001/selectbyidreposicao/'+id_reposicao);
        
         // setStartDate(data.data.data[0].data_reposicao);
         setStatus(data.data.data[0].status_reposicao);
         setObservacao(data.data.data[0].observacao_reposicao);
         setIdItemEstoque(data.data.data[0].id_itemestoque);
         setIdTotem(data.data.data[0].id_totem); // Atualiza o estado com os dados obtidos do banco
        } catch (error) {
          console.error('Erro ao buscar os dados do banco:', error);
        }
      };


    const selectEstoque = async () => {
      try {
        const data = await axios.get('http://localhost:3001/selectestoque');
        
        setSelectEstoque(data.data.data); // Atualiza o estado com os dados obtidos do banco
      } catch (error) {
        console.error('Erro ao buscar os dados do banco:', error);
      }
    };

    const selectTotem = async () => {
      try {
        const data = await axios.get('http://localhost:3001/selecttotem');
        
        setSelectTotem(data.data.data); // Atualiza o estado com os dados obtidos do banco
      } catch (error) {
        console.error('Erro ao buscar os dados do banco:', error);
      }
    };
    consultarbyid();
    selectTotem();
    selectEstoque();

  }, []);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <div>
      
      <Header />
      <div className="cadastro-produto-wrap">
        <div className="title-cadastro-voltar" href="/home">

          <a href="/gerenciar_reposicao" className="titulo">
            <img src={iconeVoltar} alt="Ícone de voltar" className="title-icon" />
            <span>EDITAR REPOSIÇÃO</span>
          </a>
        </div>
        
        <form className="cadastroreposicao-form">
          <div className='container-form'>
            <div className='inputs-field-form'>
              <br></br><br></br><br></br> <br></br><br></br>
              <div className='data-validade-field-form'>
                <div className='label-data-validade'>
                  <label className="labelform" htmlFor="data-validade">
                    <span>DATA REPOSIÇÃO</span>
                  </label>
                </div>

                <DatePicker
                
                  selected={data_reposicao}
                  onChange={handleDateChange}
                  showDayMonthYearPicker
                  dateFormat="dd/MM/yyyy" className='datepicker' />
              </div>

              <div className='categoria-field-form'>
                <div className='label-categoria'>
                  <label className="labelform" htmlFor="categoria">TOTEM</label>
                </div>
                <div className='input-categoria'>
                  <select className="selectbebida" value={id_totem}
                    required
                    onChange={(e) =>
                      setIdTotem(e.target.value)}>
                    <option value="">Selecione um Totem</option>
                    {selecttotem.map((totem) => (
                    <option key={totem.id_totem} value={totem.id_totem}>{totem.nome_totem}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='categoria-field-form'>
                <div className='label-categoria'>
                  <label className="labelform" htmlFor="categoria">ITEM DO ESTOQUE</label>
                </div>
                <div className='input-categoria'>
                  <select className="selectbebida" value={id_itemestoque}
                    required
                    onChange={(e) =>
                      setIdItemEstoque(e.target.value)}>
                      <option value="">Selecione uma Bebida</option>
                        {selectestoque.map((estoque) => (
                    <option key={estoque.id_itemestoque} value={estoque.id_itemestoque}>{estoque.Bebida.nome_bebida}</option>
                    ))}
                    </select>
                </div>
              </div>
              

              <div className='categoria-field-form'>
                <div className='label-categoria'>
                  <label className="labelform" htmlFor="categoria">STATUS REPOSICAO</label>
                </div>
                <div className='input-categoria'>
                  <select  className="selectbebida" value={status_reposicao}
                    required
                    onChange={(e) =>
                      setStatus(e.target.value)}>
                    <option value="">Selecione um Status</option>
                    <option value="EM ESPERA">Em Espera</option>
                    <option value="ANDAMENTO">Andamento</option>
                    <option value="REALIZADO">Realizado</option>
                    
                  </select>
                </div>
              </div>

              <div className='produto-field-form'>
                <div className='label-produto'>
                  <label className="labelform" htmlFor="produto">OBSERVAÇÃO:</label>
                </div>
                <div className='input-produto'>
                  <input className="inputbebida" value={observacao_reposicao} required
                    onChange={(e) =>
                      setObservacao(e.target.value)} />
                </div>
              </div>
              </div>
              <div className='area-button-confirmar'>

                <input type="submit" value="CONFIRMAR" className="cadastrar"  onClick={(e) =>
                      editarSolicitacao(e)}/>
              </div>
              
          </div>
           
        </form>

      </div>



    </div>


  );
}

export default EditarSolicitacao;