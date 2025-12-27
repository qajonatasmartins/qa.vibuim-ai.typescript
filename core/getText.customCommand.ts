import { vibe } from "../constants";

export default class GetTextCustomCommand {

    /**
     * Método para obter o texto de um elemento com Vibium
     * @param element - Seletor do elemento a ser obtido
     * @returns Promise<string>
     */
    public async getText(element: string) {
        console.log("Obtendo o texto do elemento: ", element)
        console.log("Texto obtido com sucesso: ", await vibe.find(element).text())
        return await vibe.find(element).text()
    }
}