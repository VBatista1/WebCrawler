module.exports = (termo, rangePreco, categoria, site) => {
    switch (site) {

        case 'MagazineLuiza':
            termo.split(' ').join('+')
            if (categoria != '') {
                return `https://busca.magazineluiza.com.br/busca?q=${termo}&sort=5&range_filter%5B2%5D=${rangePreco}:3&results_per_page=15${categoria}`;
            }
            else {
                return `https://busca.magazineluiza.com.br/busca?q=${termo}&sort=5&range_filter%5B2%5D=${rangePreco}:3&results_per_page=15${categoria}`;
            }
        
        case 'Amazon':
            termo.split(' ').join('+');
            rangePreco = rangePreco.split(":");
            rangePreco[0] += "00";
            rangePreco[1] += "00";
            rangePreco = rangePreco.join("-");
            if (categoria != '') {
                return `https://www.amazon.com.br/s?k=${termo}&rh=p_36%3A${rangePreco}&s=price-asc-rank`;
            }
            else {
                return `https://www.amazon.com.br/s?k=${termo}&rh=p_36%3A${rangePreco}&s=price-asc-rank`;
            }

        case 'Americanas':
            if (categoria != '') {
                return `https://www.americanas.com.br/busca/?conteudo=${termo}&filtro=%5B%7B"id"%3A"preco"%2C"value"%3A"R%24%201.000%2C00%20a%20R%24%202.500%2C00"%2C"fixed"%3Afalse%7D%5D?ordenacao=lowerPrice`;
            }
            else {
                return `https://www.americanas.com.br/busca/?conteudo=${termo}&filtro=%5B%7B"id"%3A"preco"%2C"value"%3A"R%24%201.000%2C00%20a%20R%24%202.500%2C00"%2C"fixed"%3Afalse%7D%5D?ordenacao=lowerPrice`;
            }
        default:
    }
};