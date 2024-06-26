const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;  
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const prisma = new PrismaClient({
  // Configuração de conexão com o banco de dados
  datasources: {
    db: {
      url: process.env.DATABASE_URL // Lê a variável de ambiente "DATABASE_URL" que contém a URL de conexão com o banco de dados
    },
  },
});

module.exports = { prisma, supabase }; // Exporta o objeto Prisma Client e o objeto Supabase para serem usados em outros arquivos
