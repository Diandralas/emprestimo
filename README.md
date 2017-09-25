# Simular Emprestimo

para instalar o projeto: npm install e para inicializar: nodemon

exercício dado em aula no curso de backend

Validação para empréstimo:

Vamos criar um sistema que permite com que o cliente se cadastre e faça empréstimos.

1- Configurar o projeto de NodeJS com o Express. Criar uma rota  "/hello" que irá responder um status 200 e a string 'Hello World'

2- Adicionar o Mongoose ao projeto e criar um Schema para o cliente.

3- Criar uma rota para cadastro de novos clientes em "/cliente". Todos os campos são obrigatórios, com exceção do campo 'empréstimos', que deverá ser inicializado como um vetor em branco.

4- Aprimorar a rota do item 3 para que a senha do cliente seja gravada como hash.

5- Criar uma rota para que o cliente faça login. Entregar um token via header para que ele utilize nas chamadas da API.

6- Criar um enpoint para simular empréstimo, o "/simulacao". Esse endpoint é protegido por token e solicita os seguintes dados:

{
	"valor": 2000,
	"parcelas": 4
}

Esse endpoint irá retornar a seguinte resposta (Dividir o valor pelas parcelas):

{
	"parcela": 500
}

7- Aprimorar o endpoint acima para que ele só permita empréstimos até 30% da renda do cliente e até 6 parcelas. Responder com o status 401 para empréstimos acima desse valor.

8- Fazer mais uma melhoria no empréstimo que adiciona uma taxa de juros simples de 8% ao mês no valor do empréstimo.

8- Criar um endpoint protegido por token que efetiva um empréstimo, o "/emprestimo". Ele recebe os mesmos dados e se comporta da mesma forma que o endpoint de simulação, porém, em caso de sucesso, ele insere um empréstimo dentro do documento do cliente, da seguinte forma:

{
	"_id":"cAonmsdf0324lis234Eesdfnte1",
	"nome": "Bruno",
	"renda": 5000,
	"email": "bruno@mastertech.tech",
	"senha": "sha1$asdf#:aklsdfqewreew",
	"emprestimos": [
		{
			"valor": 2000,
			"parcelas": 4,
			"data": "20/09/2017"
		}
	]
}
