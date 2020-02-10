import {CommonActions} from '@react-navigation/native';
/**
 * A navegacao esta implementada como um servico para poder ser utilizada fora dos componentes React.
 * As rotas podem ser acessadas de dentro dos Sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

// define navigator global
let navigator;

/**
 * @function setTopLevelNavigator
 * @param  {ref} navigatorRef referencia da instancia de navegacao
 */
function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

/**
 * @function navigate
 * @param  {string} routeName Nome da rota para onde nevegar
 * @param  {any} params    {description}
 */
function navigate(routeName, params) {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}

/**
 * Navega para uma rota especifica E reseta o navigation history
 * Isso sifnifica que o usuario nao pode retornar (goBack)
 *
 * @function navigateAndReset
 * @param routeName Nome da rota para onde nevegar
 * @param params Parametros da rota
 */
function navigateAndReset(routeName, params) {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      key: null,
      actions: [
        CommonActions.navigate({
          name: routeName,
          params: params,
        }),
      ],
    }),
  );
}

export default {
  navigate,
  navigateAndReset,
  setTopLevelNavigator,
};
