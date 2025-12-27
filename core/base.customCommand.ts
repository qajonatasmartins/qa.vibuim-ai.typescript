import { vibe } from "../constants";

export default class BaseCustomCommand {

    /**
     * Método para navegar para uma URL
     * @param url - URL a ser navegada
     * @returns Promise<void>
     */
    public async navigateTo(url: string) {
        console.log("Navegando para a URL: ", url)
        await vibe.go(url)
        console.log("URL navegada com sucesso: ", url)
    }

    /**
     * Método para fechar o navegador
     * @returns Promise<void>
     */
    public async finishTestExecution() {
        await vibe.quit()
        console.log("Navegador fechado com sucesso")
    }
}