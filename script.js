
/* ==== == ==== Buscar CEP ==== == ==== */

async function buscarCEP() {
    const cep = document.getElementById('cepInput').value.trim();
    if (!cep) {
        alert ('Por favor, insira um CEP.');
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('CEP não encontrado');
        }
        const data = await response.json();
        exibirResultadoCEP(data);
        buscarTemperatura();
    } catch (error) {
        alert('Erro ao buscar CEP:', error.message);
    }
}

function exibirResultadoCEP(data) {
    const logradouro = data.logradouro || '';
    const bairro = data.bairro || '';
    const localidade = data.localidade || '';
    const uf = data.uf || '';

    
    const tableInferiorDivs = document.querySelectorAll('.table-inferior div');

    tableInferiorDivs[0].textContent = logradouro;
    tableInferiorDivs[1].textContent = bairro;
    tableInferiorDivs[2].textContent = localidade + '/' + uf;
}

/* ==== == ==== Buscar TEMPERATURA ==== == ==== */

async function buscarTemperatura() {
    const lat = document.getElementById('lat').value.trim();
    const long = document.getElementById('long').value.trim();

    if (!lat || !long) {
        alert('Por favor, insira valores válidos para latitude e longitude.');
        return;
    }

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`);
        const data = await response.json();

        if (data && data.hourly && data.hourly.temperature_2m && data.hourly.temperature_2m.length > 0) {
            const atualTemperatura = data.hourly.temperature_2m[0];
            const temperaturaElement = document.getElementById('temperatura');
            temperaturaElement.innerHTML = `<div>${atualTemperatura}</div>`;
        } else {
            throw new Error('Dados de temperatura não disponíveis.');
        }


    } catch (error) {
        alert("Erro ao buscar temperatura:", error.message);
    }
}
