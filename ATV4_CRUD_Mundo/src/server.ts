import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// CRUD - CONTINENTES
// ==========================================
app.get('/continentes', async (req, res) => {
  const continentes = await prisma.continente.findMany();
  res.json(continentes);
});

app.post('/continentes', async (req, res) => {
  const { nome, descricao } = req.body;
  const novo = await prisma.continente.create({ data: { nome, descricao } });
  res.json(novo);
});

// ==========================================
// CRUD - PAÍSES
// ==========================================
app.get('/paises', async (req, res) => {
  const paises = await prisma.pais.findMany({ include: { continente: true } });
  res.json(paises);
});

app.post('/paises', async (req, res) => {
  const { nome, populacao, idioma_oficial, moeda, continenteId } = req.body;
  const novo = await prisma.pais.create({
    data: { nome, populacao, idioma_oficial, moeda, continenteId: Number(continenteId) }
  });
  res.json(novo);
});

// ==========================================
// CRUD - CIDADES
// ==========================================
app.get('/cidades', async (req, res) => {
  const cidades = await prisma.cidade.findMany({ include: { pais: true } });
  res.json(cidades);
});

app.post('/cidades', async (req, res) => {
  const { nome, populacao, latitude, longitude, paisId } = req.body;
  const novo = await prisma.cidade.create({
    data: { nome, populacao, latitude, longitude, paisId: Number(paisId) }
  });
  res.json(novo);
});

// ==========================================
// INTEGRAÇÕES COM APIs EXTERNAS
// ==========================================

// 1. API REST Countries (Busca dados e bandeira pelo nome do país)
app.get('/api/pais/:nome', async (req, res) => {
  try {
    const { nome } = req.params;
    const response = await axios.get(`https://restcountries.com/v3.1/name/${nome}`);
    res.json(response.data[0]); 
  } catch (error) {
    res.status(404).json({ erro: 'País não encontrado na API externa.' });
  }
});

// 2. API Open-Meteo (Busca clima pela Latitude e Longitude da cidade)
app.get('/api/clima/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    res.json(response.data.current_weather);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar o clima.' });
  }
});

// ==========================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});