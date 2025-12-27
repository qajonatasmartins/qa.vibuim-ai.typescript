import {
    baseCustomCommand, clickCustomCommand,
    expectCustomCommand, getTextCustomCommand
} from "../../constants";
import { menuComponents } from "../../components/menu/menu.elements";
import { loginComponents } from "../../components/login/login.elements";
import { ct001 } from "../../data/login/login.data";

describe(`${process.env.PRODUCT_NAME}`, () => {

    context(`${process.env.PRODUCT_NAME} - Login/Signup`, () => {

        before('Navegar para a página de login', async () => {
            await baseCustomCommand.navigateTo(process.env.BASE_URL!)
        })

        it('[CT-00001] - Login/Signup - Validar o título do formulário de login', async () => {
            await clickCustomCommand.click(menuComponents.btnSignupLoginMenu)
            await expectCustomCommand.expect(ct001.titleLoginForm, await getTextCustomCommand.getText(loginComponents.txtTitleLoginForm))
        });

        after('Finalizar execução do teste', async () => {
            await baseCustomCommand.finishTestExecution()
        })
    })


});