const palyer1 = {
    Nome: "Mario",
    Velocidade: 4,
    Manobrabilidade: 3,
    Poder: 3,
    Pontos: 0,
};

const palyer2 = {
    Nome: "Luigi",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 4,
    Pontos: 0,
};

async function rolldice(){
    return Math.floor(Math.random() *6 + 1);
};

async function getrandomblock(){
    let random = Math.random();
    let result

    switch (true){
        case random < 0.33:
        result = "reta";
        break;
        case random < 0.66:
        result = "curva";
        break;
        default:
        result = "confronto";
        break;

    }
    return result
}

async function logrollresult(charactername, block, diceresult, attribute){
    console.log(`jogador ${charactername} 🎲 rolou um dado de ${block} ${diceresult} + ${attribute} = ${diceresult + attribute}`);
}

async function playraceengine(character1, character2){
        for(let round = 1; round <= 5; round++){
            console.log(`🏁 Rodada ${round}`);
            //sortear bloco
            let block = await getrandomblock();
            console.log(`Bloco: ${block}`);

            //rolar os dados
            let diceresult1 = await rolldice();
            let diceresult2 = await rolldice();
    
            //teste de habilidade
            let TotalTestSkill1 = 0;
            let TotalTestSkill2 = 0;
    
            //teste blocos
            if(block === "reta"){
                TotalTestSkill1 = character1.Velocidade + diceresult1;
                TotalTestSkill2 = character2.Velocidade + diceresult2;
    
                await logrollresult(character1.Nome, "velocidade", diceresult1, character1.Velocidade);
                await logrollresult(character2.Nome, "velocidade", diceresult2, character2.Velocidade);

                if(TotalTestSkill1 < TotalTestSkill2){
                    character2.Pontos++;
                    console.log(`${character2.Nome} marcou um ponto\n`);
                }else if (TotalTestSkill1 > TotalTestSkill2){
                    character1.Pontos++;
                    console.log(`${character1.Nome} marcou um ponto\n`);
                }else{
                    console.log("Empate\n");
                }
            }
            if(block === "curva"){
                TotalTestSkill1 = character1.Manobrabilidade + diceresult1;
                TotalTestSkill2 = character2.Manobrabilidade + diceresult2;
    
                await logrollresult(character1.Nome, "manobrabilidade", diceresult1, character1.Manobrabilidade);
                await logrollresult(character2.Nome, "manobrabilidade", diceresult2, character2.Manobrabilidade);
                
                if(TotalTestSkill1 < TotalTestSkill2){
                    character2.Pontos++;
                    console.log(`${character2.Nome} marcou um ponto\n`);
                }else if (TotalTestSkill1 > TotalTestSkill2){
                    character1.Pontos++;
                    console.log(`${character1.Nome} marcou um ponto\n`);
                }else{
                    console.log("Empate\n");
                }
            }
            if(block === "confronto"){
                let powerresult1 = character1.Poder + diceresult1;
                let powerresult2 = character2.Poder + diceresult2;
                console.log(`jogador ${character1.Nome} confrontou ${character2.Nome} 🥊`);
                await logrollresult(character1.Nome, "poder", diceresult1, character1.Poder);
                await logrollresult(character2.Nome, "poder", diceresult2, character2.Poder);

                if (powerresult1 > powerresult2 && character2.Pontos > 0) {
                    console.log(
                      `${character1.Nome} venceu o confronto! ${character2.Nome} perdeu 1 ponto 🐢`
                    );
                    character2.PONTOS--;
                }else if (powerresult2 > powerresult1 && character1.Pontos > 0) {
                    console.log(
                      `${character2.Nome} venceu o confronto! ${character1.Nome} perdeu 1 ponto 🐢`
                    );
                    character1.PONTOS--;
                }else if (powerresult1 === powerresult2) {
                    console.log("Empate! Nenhum jogador perdeu pontos 🐢");
                }
            
                  
            }

            console.log("--------------------------------------------");
    
    }
}

async function declareWinner(character1, character2){
    console.log(`🏁🔴🔴🔴 Corrida entre ${character1.Nome} e ${character2.Nome} finalizada\n`);
    console.log(`Pontuação final:\n`);
    console.log(`${character1.Nome}: ${character1.Pontos} pontos\n`);
    console.log(`${character2.Nome}: ${character2.Pontos} pontos\n`);

    if (character1.Pontos > character2.Pontos){
        console.log(`🏁🏆🏁 O vencedor é ${character1.Nome} com ${character1.Pontos} pontos`);
    }else if(character2.Pontos > character1.Pontos){
        console.log(`🏁🏆🏁 O vencedor é ${character2.Nome} com ${character2.Pontos} pontos`);
    }else if(character1.Pontos === character2.Pontos){
        console.log(`🏁🏆🏁 Ocorreu um empate com ${character1.Pontos} pontos`);
    }
}

(async function main() {
    console.log(`🏁🟢🟢🟢 Corrrida entre ${palyer1.Nome} e ${palyer2.Nome} iniciada\n`);

    await playraceengine(palyer1, palyer2);

    await declareWinner(palyer1, palyer2);
})();



