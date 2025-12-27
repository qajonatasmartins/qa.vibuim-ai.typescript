import { vibe } from "../constants";

export default class ClickCustomCommand {

    /**
     * Método para clicar em um elemento com Vibium
     * @param element - Seletor do elemento a ser clicado
     * @returns Promise<void>
     */
    public async click(element: string) {
        console.log("Clicando no elemento: ", element)
        await vibe.find(element).click()
        console.log("Elemento clicado com sucesso: ", element)
    }
}