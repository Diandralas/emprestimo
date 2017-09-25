function SimularEmprestimo(valor, parcelas, renda, juros){
    resposta = {
        aceita: false,
        aviso: "",
        parcela: 0
    };
    if (parcelas > 6 || valor > renda * 0.3){
        resposta.aviso = "Valor de parcelas inválido, tente novamente";
        return resposta;
    }else{
        resposta.aceita = true;
        resposta.aviso = "Simulação aprovada!";
        resposta.parcela = (valor * juros)/ parcelas;
        return resposta;
    }
}
module.exports = SimularEmprestimo;
