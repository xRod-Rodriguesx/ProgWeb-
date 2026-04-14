import { Filme } from './Filme';

export class CatalogoFilmes {
    // Armazenar os filmes num array interno (privado para segurança)
    private filmes: Filme[] = [];

    //': void' -> cumpre a exigência de retorno explícito.
    public adicionarFilme(filme: Filme): void {
        if (filme.avaliacao !== undefined) {
            if (filme.avaliacao < 0 || filme.avaliacao > 10) {
                console.log("Erro: A avaliação deve ser um número entre 0 e 10.");
                return; // Para a execução se for inválido
            }
        }
        this.filmes.push(filme); // Manipulação de array com 'push'
        console.log(`\n✅ Filme '${filme.titulo}' adicionado com sucesso!`);
    }

    // Listar todos os filmes
    public listarFilmes(): Filme[] {
        return this.filmes;
    }

    // Buscar filmes por título
    public buscarPorTitulo(tituloBusca: string): Filme[] {
        // Usa 'filter' para permitir buscas parciais, ignorando maiúsculas/minúsculas
        return this.filmes.filter(filme => 
            filme.titulo.toLowerCase().includes(tituloBusca.toLowerCase())
        );
    }

    // Buscar filmes por género
    public buscarPorGenero(generoBusca: string): Filme[] {
        return this.filmes.filter(filme => 
            filme.genero.toLowerCase() === generoBusca.toLowerCase()
        );
    }

    // Remover filmes pelo título
    public removerFilme(titulo: string): void {
        // Usa 'findIndex' para descobrir a posição do filme no array
        const index = this.filmes.findIndex(filme => filme.titulo.toLowerCase() === titulo.toLowerCase());
        
        if (index !== -1) {
            this.filmes.splice(index, 1); // Remove o item do array
            console.log(`\n✅ Filme '${titulo}' removido com sucesso.`);
        } else {
            console.log(`\n❌ Filme '${titulo}' não encontrado no catálogo.`);
        }
    }

    // Critério de Avaliação: Criatividade em possíveis melhorias (Ordenar por Ano)
    public ordenarPorAno(): Filme[] {
        // Cria uma cópia do array e usa o método 'sort'
        return [...this.filmes].sort((a, b) => a.anoLancamento - b.anoLancamento);
    }
}