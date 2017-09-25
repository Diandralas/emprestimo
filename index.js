// Importando dependências
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const Emprestimo = require('./controllers/ControllerEmprestimo');
const ClienteSchema = require('./schemas/cliente');

// Gerando a aplicação
const app = express();

//middlewares
app.use(bodyParser.json());

//Conecta ao banco de dados
mongoose.connect("mongodb://localhost/emprestimo");

//endpoints
app.get('/hello', (request, response) => {
  response.status(200).send("Hello world!");
});

app.get('/cliente', (request, response) => {
  ClienteSchema.find((error, cliente) => {
    if(error) {
      response.sendStatus(400)
      return;
    }
    response.status(200).send(cliente);
  });
});


//rota aprimorada com hasg
app.post('/cliente', (request, response) => {
  let cliente = new ClienteSchema(request.body);
  cliente.senha = passwordHash.generate(request.body.senha);
  cliente.save((error, resultado) => {
    if(error) {
      response.status(400).send(error);
      return;
    }
    response.status(201).send(resultado);
  });
});

//criando o login
app.post('/login', (request, response) => {
  const query = {
    email: request.body.email
  };
  ClienteSchema.findOne(query, (error, cliente) => {
    if(cliente && passwordHash.verify(request.body.senha, cliente.senha)) {
      const token = jwt.sign({_id: cliente._id}, 'coxinha');
      response.set('Authorization', token);
      response.status(200).send(cliente);
      return;
    }
    response.sendStatus(403);
  });
});

//simulando o emprestimo
app.post('/simulacao', expressJwt({secret: 'coxinha'}), (request, response) => {
  let valor = request.body.valor;
  let parcelas = request.body.parcelas;
  let usuarioID = request.user._id;
  let juros = 0.08; // taxa de juros simples de 8%

  ClienteSchema.findById(usuarioID, (error, cliente) => {
    if(error) {response.sendStatus(400);
      return;
    }
    let renda = cliente.renda;
    let simulacao = SimularEmprestimo(valor, parcelas, renda, juros);

    if (simulacao.aceita)
    response.status(200).send(simulacao);
    else
    response.status(401).send(simulacao);
  });
});

//endpoint  para efetivar o emprestimo
app.post('/emprestimo', expressJwt({secret: 'coxinha'}), (request, response) => {
  let valor = request.body.valor;
  let parcelas = request.body.parcelas;
  let usuarioID = request.user._id;
  let juros = 0.08; // taxa de juros simples de 8%

  ClienteSchema.findById(usuarioID, (error, cliente) => {
    if(error) {response.sendStatus(400);
      return;
    }
    });
  });


//servidor ligado
app.listen(3000, () => {
  console.log("Servidor funcionando na porta 3000");
});
