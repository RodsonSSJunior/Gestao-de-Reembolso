(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/ReembolsoApp/i18n/i18n.properties"
/*!*************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/i18n/i18n.properties ***!
  \*************************************************************/
(module) {

module.exports = "Action_OK=OK\nAction_Cancel=Cancel\nAction_Yes=Yes\nAction_No=No\nAction_Now=Now\nAction_Later=Later\nAction_Generic_Message=Message\nAction_Confirmation_Title=Confirmation\nAction_Delete_Confirm_Message=Delete current entity?\nAction_Entity_Created=Entity created\nAction_Entity_Updated=Entity updated\nAction_Entity_Deleted=Entity deleted\nAction_Stream_Uploaded=Stream uploaded\nAction_Create_Failure=Create entity failure\nAction_Update_Failure=Update entity failure\nAction_Delete_Failure=Delete entity failure\nAction_UploadStream_Failure=Upload stream failure\nAction_RequiredFields_Failure=Please fill in all required fields\nAction_Draft_Edit=Draft Edit\nAction_Draft_Saved=Draft Saved\nAction_Draft_Discarded=Draft Discarded\nAction_Init_Activity=Downloading...\nAction_Init_Success=Application services initialized\nAction_Init_Failure=Failed to initialize application data service\nAction_Sync_Started=Upload in progress...\nAction_Sync_Completed=Sync completed\nAction_Sync_Failure=Sync offline data service failure\nAction_Download_Started=Download in progress...\nAction_Download_Successful=Download Successful\nAction_Close_Success=Data service closed successfully\nAction_Close_Failure=Failure closing data service\nAction_ErrorArchive_Upload_Failed=Upload failed!\nAction_ErrorArchive_View_Errors=View Errors\nAction_Log_Upload_Activity=Uploading...\nAction_Log_Upload_Started=Uploading Log Files...\nAction_Log_Upload_Completed=Logs Uploaded\nAction_Log_Uploaded=Log File Uploaded\nAction_Log_Upload_Failed_Title=Log Upload Failed\nAction_Log_Upload_Failed_Message=Uploading log file failed with error\nAction_App_Update_Checking=Checking for Updates...\nAction_App_Update_Complete=Update application complete\nAction_App_Update_Failed=Failed to update application\nAction_App_Update_Available_Title=New Version Available!\nAction_App_Update_Available_Message=A new version of the application is now ready to apply. Do you want to update to this version?\nAction_Reset_Title=Reset\nAction_Reset_Message=This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?\nAction_Menu_Sync_Changes=Sync Changes\nAction_Menu_Support=Support\nAction_Menu_Check_Updates=Check for Updates\nAction_Menu_About=About\nAction_Menu_Reset=Reset\nAction_Menu_Logout=Logout\nSolicitacoesReembolso=SolicitacoesReembolso\nSolicitacoesReembolso_Detail=SolicitacoesReembolso Detail\nCreate_SolicitacoesReembolso_Detail=Create SolicitacoesReembolso Detail\nUpdate_SolicitacoesReembolso_Detail=Update SolicitacoesReembolso Detail"

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/AppUpdateFailure.js"
/*!******************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/AppUpdateFailure.js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/ReembolsoApp/Actions/Application/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/AppUpdateSuccess.js"
/*!******************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/AppUpdateSuccess.js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/ReembolsoApp/Actions/Application/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/ReembolsoApp/Actions/Application/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/ClientIsMultiUserMode.js"
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/ClientIsMultiUserMode.js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
  return clientAPI.isAppInMultiUserMode();
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/GetAuthHeader.js"
/*!***************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/GetAuthHeader.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetAuthHeader)
/* harmony export */ });
/**
 * Retorna o Header de Autenticação atual para as requisições OData
 * @param {IClientAPI} clientAPI
 */
function GetAuthHeader(clientAPI) {
  let clientData = clientAPI.getAppClientData();
  return clientData.AuthHeader || clientAPI.evaluateTargetPath('#Page:Main/#ClientData/AuthHeader') || 'Basic c29saWNpdGFudGU6MTIz';
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/GetButtonCaption.js"
/*!******************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/GetButtonCaption.js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetButtonCaption)
/* harmony export */ });
/**
 * Retorna o rótulo do botão exibindo o perfil atual ativo
 * @param {IClientAPI} clientAPI
 */
function GetButtonCaption(clientAPI) {
  let role = clientAPI.getAppClientData().UserRole || 'SOLICITANTE';
  return `Perfil: ${role}`;
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/GetClientSupportVersions.js"
/*!**************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/GetClientSupportVersions.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
  let versionInfo = clientAPI.getVersionInfo();
  let versionStr = '';
  Object.keys(versionInfo).forEach(function (key, index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
    //console.log(`Key: ${key}   Index: ${index}`);
    if (key != 'Application Version') {
      versionStr += `${key}: ${versionInfo[key]}\n`;
    }
  });
  return versionStr;
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/GetClientVersion.js"
/*!******************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/GetClientVersion.js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
  let versionInfo = clientAPI.getVersionInfo();
  if (versionInfo.hasOwnProperty('Application Version')) {
    return versionInfo['Application Version'];
  }
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/IsAprovador.js"
/*!*************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/IsAprovador.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IsAprovador)
/* harmony export */ });
// Controla a visibilidade de botões/telas restritos ao Aprovador
// (ex.: seção "Ações do Aprovador" em SolicitacoesReembolso_Detail.page).
// Depende do Application Client Data ter sido preenchido no startup por
// SetUserRole.action / StoreUserRole.js (plugado em Main.page > OnLoaded).
function IsAprovador(clientAPI) {
  const appClientData = clientAPI.getAppClientData();
  return appClientData.UserRole === 'APROVADOR';
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/OnWillUpdate.js"
/*!**************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/OnWillUpdate.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/ReembolsoApp/Actions/Application/OnWillUpdate.action').then(result => {
    if (result.data) {
      return Promise.resolve();
    } else {
      return Promise.reject('User Deferred');
    }
  }, failure => Promise.reject('OnWillUpdate Failed ' + String(failure)));
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/PodeAprovarOuRejeitar.js"
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/PodeAprovarOuRejeitar.js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PodeAprovarOuRejeitar)
/* harmony export */ });
/* harmony import */ var _IsAprovador__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IsAprovador */ "./build.definitions/ReembolsoApp/Rules/Application/IsAprovador.js");

function PodeAprovarOuRejeitar(clientAPI) {
  // 1. Verifica se o utilizador tem o papel de Aprovador ativo
  const eAprovador = (0,_IsAprovador__WEBPACK_IMPORTED_MODULE_0__["default"])(clientAPI);

  // 2. Verifica se a solicitação atual permite análise
  const registro = clientAPI.getBindingObject();
  const status = registro && registro.status;
  const statusValido = status === 'PENDENTE' || status === 'REQUER_APROVACAO';

  // Retorna true apenas se AMBAS as condições forem satisfeitas
  return eAprovador && statusValido;
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/PodeEditarOuExcluir.js"
/*!*********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/PodeEditarOuExcluir.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PodeEditarOuExcluir)
/* harmony export */ });
// Mantém a UI coerente com as regras já aplicadas no backend
// (service.js: before UPDATE/DELETE). Isso NÃO substitui a checagem do
// servidor — é só para não mostrar um botão que o backend vai rejeitar.
function PodeEditarOuExcluir(clientAPI) {
  const appClientData = clientAPI.getAppClientData();
  if (appClientData.UserRole === 'APROVADOR') return true;
  const registro = clientAPI.getBindingObject();
  return registro && registro.status === 'PENDENTE';
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/ResetAppSettingsAndLogout.js"
/*!***************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \***************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
  let logger = clientAPI.getLogger();
  let platform = clientAPI.nativescript.platformModule;
  let appSettings = clientAPI.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return clientAPI.getPageProxy().executeAction('/ReembolsoApp/Actions/Application/Reset.action');
  }
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/StoreUserRole.js"
/*!***************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/StoreUserRole.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StoreUserRole)
/* harmony export */ });
// Fonte: https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/client-data.html
// clientAPI.getAppClientData() retorna um objeto vivo: atribuir uma
// propriedade nele já persiste o valor para o resto da sessão do app
// (dura até o app ser fechado/removido da lista de recentes).
function StoreUserRole(clientAPI) {
  const result = clientAPI.getActionResult('MyProfileResult');
  const role = result && result.data && result.data.role || 'SOLICITANTE';
  const appClientData = clientAPI.getAppClientData();
  appClientData.UserRole = role;
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Application/SwitchRole.js"
/*!************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Application/SwitchRole.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SwitchRole)
/* harmony export */ });
/**
 * Alterna entre os perfis SOLICITANTE e APROVADOR no MDK
 * @param {IClientAPI} clientAPI
 */
function SwitchRole(clientAPI) {
  try {
    let clientData = clientAPI.getAppClientData();
    let currentRole = clientData.UserRole || 'SOLICITANTE';
    let novaRole = currentRole === 'SOLICITANTE' ? 'APROVADOR' : 'SOLICITANTE';
    clientData.UserRole = novaRole;
    clientData.AuthHeader = novaRole === 'APROVADOR' ? 'Basic YXByb3ZhZG9yOjEyMw==' : 'Basic c29saWNpdGFudGU6MTIz';
    clientAPI.showMessageJS(`Perfil alterado para: ${novaRole}`, 'Troca de Usuário');

    // redraw() não reativa Header/Subhead/ActionBarItem.Caption de forma
    // confiável nessa versão do MDK. Forçamos reload completo da página
    // atual para que o ObjectHeader releia o clientData do zero.
    clientAPI.navigateToPage('/ReembolsoApp/Pages/Main.page', {}, false, true);
  } catch (err) {
    clientAPI.showMessageJS(`Erro no SwitchRole: ${err && err.message}`, 'Debug');
  }
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Logging/LogLevels.js"
/*!*******************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Logging/LogLevels.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
  var levels = [];
  levels.push({
    'DisplayValue': 'Error',
    'ReturnValue': 'Error'
  });
  levels.push({
    'DisplayValue': 'Warning',
    'ReturnValue': 'Warn'
  });
  levels.push({
    'DisplayValue': 'Info',
    'ReturnValue': 'Info'
  });
  levels.push({
    'DisplayValue': 'Debug',
    'ReturnValue': 'Debug'
  });
  levels.push({
    'DisplayValue': 'Trace',
    'ReturnValue': 'Trace'
  });
  return levels;
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Logging/SetTraceCategories.js"
/*!****************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Logging/SetTraceCategories.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
  var logger = clientAPI.getLogger();
  const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
  const fcsection = sectionedTable.getSection('FormCellSection0');
  const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
  const odataTrace = fcsection.getControl('odataTrace');
  try {
    if (traceCategory.getValue()) {
      var values = traceCategory.getValue();
      var categories = [];
      if (values && values.length) {
        categories = values.map(value => {
          return 'mdk.trace.' + value.ReturnValue;
        });
      }
      clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
    }
  } catch (exception) {
    logger.log(String(exception), 'Error');
    return undefined;
  }
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Logging/SetUserLogLevel.js"
/*!*************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Logging/SetUserLogLevel.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
  var logger;
  try {
    if (clientAPI.getValue() && clientAPI.getValue()[0]) {
      logger = clientAPI.getLogger();
      var listPickerValue = clientAPI.getValue()[0].ReturnValue;
      if (listPickerValue) {
        switch (listPickerValue) {
          case 'Debug':
            logger.setLevel('Debug');
            ShowTraceOptions(clientAPI, false);
            break;
          case 'Error':
            logger.setLevel('Error');
            ShowTraceOptions(clientAPI, false);
            break;
          case 'Warn':
            logger.setLevel('Warn');
            ShowTraceOptions(clientAPI, false);
            break;
          case 'Info':
            logger.setLevel('Info');
            ShowTraceOptions(clientAPI, false);
            break;
          case 'Trace':
            logger.setLevel('Trace');
            ShowTraceOptions(clientAPI, true);
            break;
          default:
            // eslint-disable-next-line no-console
            console.log(`unrecognized key ${listPickerValue}`);
        }
        return listPickerValue;
      }
    }
  } catch (exception) {
    if (logger) {
      logger.log(String(exception), 'Error');
    } else {
      // eslint-disable-next-line no-console
      console.log('Error: ' + String(exception));
    }
    return undefined;
  }
}
function ShowTraceOptions(clientAPI, tracingEnabled) {
  let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
  let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');
  categories.setVisible(tracingEnabled);
  odataTrace.setVisible(tracingEnabled);
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Logging/ToggleLogging.js"
/*!***********************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Logging/ToggleLogging.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
  var logger;
  try {
    logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
    const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
    let switchValue = enableLogSwitch.getValue();
    if (switchValue) {
      logger.on();
      logLevelListPicker.setVisible(true);
      logLevelListPicker.setEditable(true);
      logLevelListPicker.redraw();
    } else {
      logger.off();
      logLevelListPicker.setEditable(false);
      logLevelListPicker.setVisible(false);
      logLevelListPicker.redraw();
    }
    return switchValue;
  } catch (exception) {
    if (logger) {
      logger.log(String(exception), 'Error');
    } else {
      // eslint-disable-next-line no-console
      console.log('Error: ' + String(exception));
    }
    return undefined;
  }
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Logging/TraceCategories.js"
/*!*************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Logging/TraceCategories.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
  var categories = ['action', 'api', 'app', 'binding', 'branding', 'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push', 'restservice', 'settings', 'targetpath', 'ui'];
  var values = [];
  categories.forEach(category => {
    values.push({
      'DisplayValue': category,
      'ReturnValue': category
    });
  });
  return values;
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Logging/UserLogSetting.js"
/*!************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Logging/UserLogSetting.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {
  try {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
    const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    //Persist the user logging preferences
    if (logger) {
      console.log("in logger state");
      if (logger.isTurnedOn()) {
        if (enableLogSwitch) {
          enableLogSwitch.setValue(true);
        }
        if (logLevelListPicker) {
          logLevelListPicker.setEditable(true);
        }
      } else {
        if (enableLogSwitch) {
          enableLogSwitch.setValue(false);
        }
        if (logLevelListPicker) {
          logLevelListPicker.setEditable(false);
        }
      }
      var logLevel = logger.getLevel();
      if (logLevel) {
        if (logLevelListPicker) {
          logLevelListPicker.setValue([logLevel]);
        }
      }
      if (logLevel === 'Trace') {
        traceCategory.setVisible(true);
        odataTrace.setVisible(true);
      }

      //Upon selecting a value in the List picker and clicking the back button 
      //will enable the onload page rule. This will set the selected value
      //in the control
      if (logLevelListPicker.getValue()[0]) {
        var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
        if (returnValue) {
          logLevelListPicker.setValue([returnValue]);
          logger.setLevel(returnValue);
        }
      }
    }
  } catch (exception) {
    // eslint-disable-next-line no-console
    console.log(String(exception), 'Error User Logger could not be set');
  }
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Edit.js"
/*!************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Edit.js ***!
  \************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
  if (clientAPI.getODataProvider('/ReembolsoApp/Services/ReembolsoService.service').isDraftEnabled('SolicitacoesReembolso')) {
    return clientAPI.executeAction({
      'Name': '/ReembolsoApp/Actions/DraftEditEntity.action',
      'Properties': {
        'Target': {
          'EntitySet': 'SolicitacoesReembolso'
        },
        'OnSuccess': '/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Edit.action'
      }
    });
  } else {
    return clientAPI.executeAction('/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Edit.action');
  }
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_Cancel.js"
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_Cancel.js ***!
  \*********************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
  if (clientAPI.getODataProvider('/ReembolsoApp/Services/ReembolsoService.service').isDraftEnabled('SolicitacoesReembolso')) {
    return clientAPI.executeAction({
      'Name': '/ReembolsoApp/Actions/DraftDiscardEntity.action',
      'Properties': {
        'Target': {
          'EntitySet': 'SolicitacoesReembolso'
        },
        'OnSuccess': '/ReembolsoApp/Actions/CloseModalPage_Cancel.action'
      }
    });
  } else {
    return clientAPI.executeAction('/ReembolsoApp/Actions/CloseModalPage_Cancel.action');
  }
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.js"
/*!***************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.js ***!
  \***************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
  // Vamos direto ao ponto para evitar falhas do isDraftEnabled
  return clientAPI.executeAction('/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.action').then(result => {
    try {
      // Se falhar aqui, o Catch vai capturar e mostrar na tela
      let newEntity = JSON.parse(result.data);
      let id = newEntity.ID;
      let targetReadLink = `SolicitacoesReembolso(ID=${id},IsActiveEntity=false)`;
      return clientAPI.executeAction({
        'Name': '/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DraftActivate.action',
        'Properties': {
          'Target': {
            'EntitySet': 'SolicitacoesReembolso',
            'ReadLink': targetReadLink
          }
        }
      });
    } catch (error) {
      // Mostra o erro exato na tela do celular
      return clientAPI.executeAction({
        "Name": "/ReembolsoApp/Actions/GenericMessageBox.action",
        "Properties": {
          "Message": "Erro no script: " + error.message,
          "Title": "Falha no JS",
          "OKCaption": "OK"
        }
      });
    }
  });
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteConfirmation.js"
/*!*********************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteConfirmation.js ***!
  \*********************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/ReembolsoApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_UpdateEntity.js"
/*!***************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_UpdateEntity.js ***!
  \***************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
  if (clientAPI.getODataProvider('/ReembolsoApp/Services/ReembolsoService.service').isDraftEnabled('SolicitacoesReembolso')) {
    return clientAPI.executeAction({
      'Name': '/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_UpdateEntity.action',
      'Properties': {
        'OnSuccess': ''
      }
    }).then(result => {
      return clientAPI.executeAction({
        'Name': '/ReembolsoApp/Actions/DraftSaveEntity.action',
        'Properties': {
          'Target': {
            'EntitySet': 'SolicitacoesReembolso'
          }
        }
      });
    });
  } else {
    return clientAPI.executeAction('/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_UpdateEntity.action');
  }
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Rules/Service/Initialize.js"
/*!********************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Rules/Service/Initialize.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {
  // Perform pre data initialization task

  // Initialize all your Data sources
  let _ReembolsoService = context.executeAction('/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnline.action');

  //You can add more service initialize actions here

  // The Initialize<Online|Offline>.action wires its own OnSuccess (success
  // toast) and OnFailure (failure banner) handlers. We propagate the
  // rejection so the caller of Initialize() — typically the Application's
  // OnLaunch chain — can react to a failed initialization rather than
  // proceeding as if everything were fine. Older revisions of this
  // template returned `false` from the catch, which silently swallowed
  // initialization errors (MDK-18173 review section 1.2).
  return Promise.all([_ReembolsoService]);
}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Styles/Styles.css"
/*!**********************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Styles/Styles.css ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js */ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ },

/***/ "./build.definitions/ReembolsoApp/Styles/Styles.less"
/*!***********************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Styles/Styles.less ***!
  \***********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js */ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ },

/***/ "./build.definitions/ReembolsoApp/Styles/Styles.light.css"
/*!****************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Styles/Styles.light.css ***!
  \****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js */ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ },

/***/ "./build.definitions/ReembolsoApp/Styles/Styles.light.nss"
/*!****************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Styles/Styles.light.nss ***!
  \****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js */ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ },

/***/ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js"
/*!*******************************************************************************************************!*\
  !*** ../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js ***!
  \*******************************************************************************************************/
(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js"
/*!****************************************************************************************************************!*\
  !*** ../../../../Roaming/npm/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \****************************************************************************************************************/
(module) {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/Application/About.page"
/*!*********************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/Application/About.page ***!
  \*********************************************************************/
(module) {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/ReembolsoApp/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/ReembolsoApp/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/ReembolsoApp/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)","_Type":"KeyValue.Type.Item"},{"Value":"/ReembolsoApp/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/ReembolsoApp/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"About","PreferredCaptionSize":"Large","_Type":"Control.Type.ActionBar"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/Application/Support.page"
/*!***********************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/Application/Support.page ***!
  \***********************************************************************/
(module) {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/ReembolsoApp/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/ReembolsoApp/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/ReembolsoApp/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/ReembolsoApp/Actions/Application/NavToActivityLog.action","_Type":"SimplePropertyCollection.Type.Cell"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/ReembolsoApp/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"Settings","PreferredCaptionSize":"Small","_Type":"Control.Type.ActionBar"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/Application/UserActivityLog.page"
/*!*******************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/Application/UserActivityLog.page ***!
  \*******************************************************************************/
(module) {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/ReembolsoApp/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/ReembolsoApp/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/ReembolsoApp/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/ReembolsoApp/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/ReembolsoApp/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/ReembolsoApp/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/ReembolsoApp/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","ActionBar":{"Caption":"Activity Log","PreferredCaptionSize":"Small","_Type":"Control.Type.ActionBar"},"OnLoaded":"/ReembolsoApp/Rules/Logging/UserLogSetting.js"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/Main.page"
/*!********************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/Main.page ***!
  \********************************************************/
(module) {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectHeader","_Name":"ObjectHeaderSection","ObjectHeader":{"HeadlineText":"Gestão de Reembolsos","Subhead":"#Page:Main/#ClientData/UserRole","BodyText":"Acompanhe e gerencie solicitações de forma rápida e segura.","StatusText":"Online","DetailImage":"sap-icon://expense-report","DetailImageIsCircular":false}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable_ReembolsoService","Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionHeader_ReembolsoService","AccessoryType":"None","UseTopPadding":true,"Caption":"Ações Rápidas"},"Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"BtnPendentes","Title":"Reembolsos Abertos (Pendentes)","Alignment":"Center","Image":"sap-icon://pending","ImagePosition":"Leading","FullWidth":true,"Visible":true,"Enabled":true,"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavPendentes.action","ButtonType":"Text"},{"_Type":"ButtonTable.Type.Button","_Name":"BtnAprovados","Title":"Reembolsos Aprovados","Alignment":"Center","Image":"sap-icon://accept","ImagePosition":"Leading","FullWidth":true,"Visible":true,"Enabled":true,"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavAprovados.action","ButtonType":"Text"},{"_Type":"ButtonTable.Type.Button","_Name":"BtnRejeitados","Title":"Reembolsos Rejeitados","Alignment":"Center","Image":"sap-icon://decline","ImagePosition":"Leading","FullWidth":true,"Visible":true,"Enabled":true,"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavRejeitados.action","ButtonType":"Text"},{"_Type":"ButtonTable.Type.Button","_Name":"BtnCriarReembolso","Title":"Criar Novo Reembolso","Alignment":"Center","Image":"sap-icon://add","ImagePosition":"Leading","FullWidth":true,"Visible":true,"Enabled":true,"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavCriar.action","ButtonType":"Text"}]}]}],"_Type":"Page","_Name":"Main","ActionBar":{"Items":[{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem0","Caption":"Menu","Width":18,"Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/ReembolsoApp/Actions/Application/UserMenuPopover.action"},{"_Type":"Control.Type.ActionBarItem","_Name":"SwitchRoleItem","Caption":"Alternar Perfil","Width":18,"Icon":"sap-icon://synchronize","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/ReembolsoApp/Rules/Application/SwitchRole.js"}],"_Name":"ActionBar1","_Type":"Control.Type.ActionBar","Caption":"Painel Principal","PreferredCaptionSize":"Large"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Create.page"
/*!***********************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Create.page ***!
  \***********************************************************************************************************************/
(module) {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"descricao","RequiredIndicator":true,"IsVisible":true,"Separator":true,"Caption":"Descrição","PlaceHolder":"Ex: Almoço com cliente","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"valor","RequiredIndicator":true,"IsVisible":true,"Separator":true,"Caption":"Valor (R$)","PlaceHolder":"0.00","KeyboardType":"Number","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"categoria","Caption":"Categoria","IsEditable":true,"IsVisible":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"PickerItems":[{"DisplayValue":"Alimentação","ReturnValue":"Alimentacao"},{"DisplayValue":"Transporte","ReturnValue":"Transporte"},{"DisplayValue":"Hospedagem","ReturnValue":"Hospedagem"},{"DisplayValue":"Viagem","ReturnValue":"Viagem"},{"DisplayValue":"Outros","ReturnValue":"Outros"}]},{"Value":"BRL","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"moeda","RequiredIndicator":false,"IsVisible":true,"Separator":true,"Caption":"Moeda","Enabled":true,"IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"SolicitacoesReembolso_Create","ActionBar":{"Items":[{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem0","Caption":"","SystemItem":"Cancel","Width":18,"Position":"Left","IsIconCircular":false,"OnPress":"/ReembolsoApp/Actions/CloseModalPage_Cancel.action"},{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem1","Caption":"Salvar","SystemItem":"Done","Width":18,"Position":"Right","IsIconCircular":false,"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.action"}],"_Name":"ActionBar0","_Type":"Control.Type.ActionBar","Caption":"Novo Reembolso"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Detail.page"
/*!***********************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Detail.page ***!
  \***********************************************************************************************************************/
(module) {

module.exports = {"DesignTimeTarget":{"Service":"/ReembolsoApp/Services/ReembolsoService.service","EntitySet":"SolicitacoesReembolso","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash","Visible":"/ReembolsoApp/Rules/Application/PodeEditarOuExcluir.js","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,SolicitacoesReembolso_Detail)","_Type":"Control.Type.ActionBar"},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{descricao}","BodyText":"","Footnote":"{categoria}","Description":"{valor}","StatusText":"{status}","StatusImage":"","SubstatusImage":"","SubstatusText":"{moeda}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"descricao","Value":"{descricao}","_Type":"KeyValue.Type.Item"},{"KeyName":"valor","Value":"{valor}","_Type":"KeyValue.Type.Item"},{"KeyName":"categoria","Value":"{categoria}","_Type":"KeyValue.Type.Item"},{"KeyName":"status","Value":"{status}","_Type":"KeyValue.Type.Item"},{"KeyName":"moeda","Value":"{moeda}","_Type":"KeyValue.Type.Item"},{"KeyName":"valor Convertido","Value":"{valorConvertido}","_Type":"KeyValue.Type.Item"},{"KeyName":"motivo Analise","Value":"{motivoAnalise}","_Type":"KeyValue.Type.Item"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"_Name":"SectionButtonTable_Aprovacao","_Type":"Section.Type.ButtonTable","Visible":"/ReembolsoApp/Rules/Application/IsAprovador.js","Header":{"Caption":"Ações do Aprovador","_Type":"SectionCommon.Type.Header"},"Buttons":[{"_Type":"ButtonTable.Type.Button","Title":"Aprovar","ButtonType":"Text","Alignment":"Center","Visible":"/ReembolsoApp/Rules/Application/PodeAprovarOuRejeitar.js","OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/AprovarReembolso.action"},{"_Type":"ButtonTable.Type.Button","Title":"Rejeitar","ButtonType":"Text","Alignment":"Center","Visible":"/ReembolsoApp/Rules/Application/PodeAprovarOuRejeitar.js","OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToRejeitarReembolso_Prompt.action"}]}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SolicitacoesReembolso_Detail"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List.page"
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List.page ***!
  \*********************************************************************************************************************/
(module) {

module.exports = {"_Name":"SolicitacoesReembolso_List","_Type":"Page","ActionBar":{"Items":[{"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Create.action","Position":"Right","SystemItem":"Add","_Type":"Control.Type.ActionBarItem"}],"Caption":"$(L,SolicitacoesReembolso)","_Type":"Control.Type.ActionBar"},"Controls":[{"_Name":"SectionedTable","_Type":"Control.Type.SectionedTable","DataSubscriptions":["SolicitacoesReembolso"],"Sections":[{"_Name":"SectionObjectTable","_Type":"Section.Type.ObjectTable","Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Title":"{descricao}","Subhead":"Categoria: {categoria}","Footnote":"Moeda: {moeda}","StatusText":"{valor}","StatusImage":"sap-icon://money-bills","SubstatusText":"{status}","Styles":{"StatusText":"CurrencyStyle","SubstatusText":"StatusColorStyle"},"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Detail.action","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"SolicitacoesReembolso","Service":"/ReembolsoApp/Services/ReembolsoService.service","QueryOptions":""}}]}]}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Aprovados.page"
/*!*******************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Aprovados.page ***!
  \*******************************************************************************************************************************/
(module) {

module.exports = {"_Name":"SolicitacoesReembolso_List_Aprovados","_Type":"Page","ActionBar":{"Caption":"Reembolsos Aprovados","_Type":"Control.Type.ActionBar"},"Controls":[{"_Name":"SectionedTable","_Type":"Control.Type.SectionedTable","DataSubscriptions":["SolicitacoesReembolso"],"Sections":[{"_Name":"SectionObjectTable","_Type":"Section.Type.ObjectTable","Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Title":"{descricao}","Subhead":"Categoria: {categoria}","Footnote":"Moeda: {moeda}","StatusText":"{valor}","StatusImage":"sap-icon://money-bills","SubstatusText":"{status}","Styles":{"StatusText":"CurrencyStyle","SubstatusText":"StatusColorStyle"},"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Detail.action","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"Nenhuma solicitação aprovada"},"Target":{"EntitySet":"SolicitacoesReembolso","Service":"/ReembolsoApp/Services/ReembolsoService.service","QueryOptions":"$filter=status eq 'APROVADO_MANUAL' or status eq 'APROVADO_AUTO'"}}]}]}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Pendentes.page"
/*!*******************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Pendentes.page ***!
  \*******************************************************************************************************************************/
(module) {

module.exports = {"_Name":"SolicitacoesReembolso_List_Pendentes","_Type":"Page","ActionBar":{"Items":[{"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Create.action","Position":"Right","SystemItem":"Add","_Type":"Control.Type.ActionBarItem"}],"Caption":"Reembolsos Pendentes","_Type":"Control.Type.ActionBar"},"Controls":[{"_Name":"SectionedTable","_Type":"Control.Type.SectionedTable","DataSubscriptions":["SolicitacoesReembolso"],"Sections":[{"_Name":"SectionObjectTable","_Type":"Section.Type.ObjectTable","Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Title":"{descricao}","Subhead":"Categoria: {categoria}","Footnote":"Moeda: {moeda}","StatusText":"{valor}","StatusImage":"sap-icon://money-bills","SubstatusText":"{status}","Styles":{"StatusText":"CurrencyStyle","SubstatusText":"StatusColorStyle"},"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Detail.action","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"Nenhuma solicitação pendente"},"Target":{"EntitySet":"SolicitacoesReembolso","Service":"/ReembolsoApp/Services/ReembolsoService.service","QueryOptions":"$filter=status eq 'PENDENTE' or status eq 'REQUER_APROVACAO'"}}]}]}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Rejeitados.page"
/*!********************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Rejeitados.page ***!
  \********************************************************************************************************************************/
(module) {

module.exports = {"_Name":"SolicitacoesReembolso_List_Rejeitados","_Type":"Page","ActionBar":{"Caption":"Reembolsos Rejeitados","_Type":"Control.Type.ActionBar"},"Controls":[{"_Name":"SectionedTable","_Type":"Control.Type.SectionedTable","DataSubscriptions":["SolicitacoesReembolso"],"Sections":[{"_Name":"SectionObjectTable","_Type":"Section.Type.ObjectTable","Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Title":"{descricao}","Subhead":"Categoria: {categoria}","Footnote":"Moeda: {moeda}","StatusText":"{valor}","StatusImage":"sap-icon://money-bills","SubstatusText":"{status}","Styles":{"StatusText":"CurrencyStyle","SubstatusText":"StatusColorStyle"},"OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Detail.action","_Type":"ObjectTable.Type.ObjectCell"},"EmptySection":{"Caption":"Nenhuma solicitação rejeitada"},"Target":{"EntitySet":"SolicitacoesReembolso","Service":"/ReembolsoApp/Services/ReembolsoService.service","QueryOptions":"$filter=status eq 'REJEITADO'"}}]}]}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_RejeitarPrompt.page"
/*!*******************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_RejeitarPrompt.page ***!
  \*******************************************************************************************************************************/
(module) {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"motivo","Caption":"Motivo da rejeição","RequiredIndicator":true,"IsVisible":true,"Separator":true,"Enabled":true,"IsEditable":true}]}]}],"_Type":"Page","_Name":"SolicitacoesReembolso_RejeitarPrompt","ActionBar":{"Items":[{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem0","SystemItem":"Cancel","Position":"Left","OnPress":"/ReembolsoApp/Actions/CloseModalPage_Cancel.action"},{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem1","Caption":"Confirmar","SystemItem":"Done","Position":"Right","OnPress":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/RejeitarReembolso.action"}],"_Name":"ActionBar0","_Type":"Control.Type.ActionBar","Caption":"Rejeitar Solicitação"}}

/***/ },

/***/ "./build.definitions/Application.app"
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
(module) {

module.exports = {"MainPage":"/ReembolsoApp/Pages/Main.page","OnLaunch":[],"OnWillUpdate":"/ReembolsoApp/Rules/Application/OnWillUpdate.js","Styles":"/ReembolsoApp/Styles/Styles.css","Version":"/ReembolsoApp/Globals/Application/AppDefinition_Version.global","Localization":"/ReembolsoApp/i18n/i18n.properties","_SchemaVersion":"26.6","_Name":"ReembolsoApp","StyleSheets":{"Styles":{"css":"/ReembolsoApp/Styles/Styles.light.css","ios":"/ReembolsoApp/Styles/Styles.light.nss","android":"/ReembolsoApp/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/ReembolsoApp/Styles/Styles.light.nss","android":"/ReembolsoApp/Styles/Styles.light.json"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/AppUpdate.action"
/*!*****************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/AppUpdate.action ***!
  \*****************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/ReembolsoApp/Rules/Application/AppUpdateFailure.js","OnSuccess":"/ReembolsoApp/Rules/Application/AppUpdateSuccess.js"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/AppUpdateFailureMessage.action"
/*!*******************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/AppUpdateFailureMessage.action ***!
  \*******************************************************************************************/
(module) {

module.exports = {"Message":"$(L,Action_App_Update_Failed) - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/AppUpdateProgressBanner.action"
/*!*******************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/AppUpdateProgressBanner.action ***!
  \*******************************************************************************************/
(module) {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"$(L,Action_App_Update_Checking)","OnSuccess":"/ReembolsoApp/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/AppUpdateSuccessMessage.action"
/*!*******************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/AppUpdateSuccessMessage.action ***!
  \*******************************************************************************************/
(module) {

module.exports = {"Animated":true,"Duration":2,"Message":"$(L,Action_App_Update_Complete)","_Type":"Action.Type.ToastMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/Logout.action"
/*!**************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/Logout.action ***!
  \**************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/NavToAbout.action"
/*!******************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/NavToAbout.action ***!
  \******************************************************************************/
(module) {

module.exports = {"ModalPage":true,"PageToOpen":"/ReembolsoApp/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/NavToActivityLog.action"
/*!************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/NavToActivityLog.action ***!
  \************************************************************************************/
(module) {

module.exports = {"ModalPage":true,"PageToOpen":"/ReembolsoApp/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/NavToSupport.action"
/*!********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/NavToSupport.action ***!
  \********************************************************************************/
(module) {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/ReembolsoApp/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/OnWillUpdate.action"
/*!********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/OnWillUpdate.action ***!
  \********************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Message","Message":"$(L,Action_App_Update_Available_Message)","Title":"$(L,Action_App_Update_Available_Title)","OKCaption":"$(L,Action_Now)","CancelCaption":"$(L,Action_Later)","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/Reset.action"
/*!*************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/Reset.action ***!
  \*************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/ResetMessage.action"
/*!********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/ResetMessage.action ***!
  \********************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Message","Message":"$(L,Action_Reset_Message)","Title":"$(L,Action_Reset_Title)","OKCaption":"$(L,Action_Yes)","OnOK":"/ReembolsoApp/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"$(L,Action_No)"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/SetUserRole.action"
/*!*******************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/SetUserRole.action ***!
  \*******************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ODataService.CallFunction","Target":{"Function":{"Name":"getMyProfile","Parameters":{}},"Service":"/ReembolsoApp/Services/ReembolsoService.service"},"ActionResult":{"_Name":"MyProfileResult"},"OnSuccess":"/ReembolsoApp/Rules/Application/StoreUserRole.js"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Application/UserMenuPopover.action"
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Application/UserMenuPopover.action ***!
  \***********************************************************************************/
(module) {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/ReembolsoApp/Actions/Application/NavToSupport.action","Title":"$(L,Action_Menu_Support)","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/ReembolsoApp/Actions/Application/AppUpdateProgressBanner.action","Title":"$(L,Action_Menu_Check_Updates)","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/ReembolsoApp/Actions/Application/NavToAbout.action","Title":"$(L,Action_Menu_About)","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/ReembolsoApp/Actions/Application/ResetMessage.action","Title":"$(L,Action_Menu_Reset)","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/ReembolsoApp/Actions/Application/Logout.action","Title":"$(L,Action_Menu_Logout)","Visible":"/ReembolsoApp/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/CloseModalPage_Cancel.action"
/*!*****************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/CloseModalPage_Cancel.action ***!
  \*****************************************************************************/
(module) {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/CloseModalPage_Complete.action"
/*!*******************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/CloseModalPage_Complete.action ***!
  \*******************************************************************************/
(module) {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ClosePage.action"
/*!*****************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ClosePage.action ***!
  \*****************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/CreateEntityFailureMessage.action"
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/CreateEntityFailureMessage.action ***!
  \**********************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"$(L,Action_Create_Failure) - {#ActionResults:update/error}","Duration":7,"Animated":true}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/CreateEntitySuccessMessage.action"
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/CreateEntitySuccessMessage.action ***!
  \**********************************************************************************/
(module) {

module.exports = {"Animated":true,"Duration":2,"Message":"$(L,Action_Entity_Created)","IsIconHidden":true,"OnSuccess":"/ReembolsoApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/DeleteConfirmation.action"
/*!**************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/DeleteConfirmation.action ***!
  \**************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Message","Message":"$(L,Action_Delete_Confirm_Message)","Title":"$(L,Action_Confirmation_Title)","OKCaption":"$(L,Action_OK)","CancelCaption":"$(L,Action_Cancel)","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/DeleteEntityFailureMessage.action"
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/DeleteEntityFailureMessage.action ***!
  \**********************************************************************************/
(module) {

module.exports = {"Message":"$(L,Action_Delete_Failure) - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/DeleteEntitySuccessMessage.action"
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/DeleteEntitySuccessMessage.action ***!
  \**********************************************************************************/
(module) {

module.exports = {"Animated":true,"Duration":2,"Message":"$(L,Action_Entity_Deleted)","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/ReembolsoApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/DraftDiscardEntity.action"
/*!**************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/DraftDiscardEntity.action ***!
  \**************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/ReembolsoApp/Services/ReembolsoService.service","EntitySet":"SolicitacoesReembolso","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/ReembolsoApp/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"$(L,Action_Draft_Discarded)"}},"OnFailure":"/ReembolsoApp/Actions/UpdateEntityFailureMessage.action"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/DraftEditEntity.action"
/*!***********************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/DraftEditEntity.action ***!
  \***********************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/ReembolsoApp/Services/ReembolsoService.service","EntitySet":"SolicitacoesReembolso","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/ReembolsoApp/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"$(L,Action_Draft_Edit)"}},"OnFailure":"/ReembolsoApp/Actions/UpdateEntityFailureMessage.action"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/DraftSaveEntity.action"
/*!***********************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/DraftSaveEntity.action ***!
  \***********************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/ReembolsoApp/Services/ReembolsoService.service","EntitySet":"SolicitacoesReembolso","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActivityIndicatorText":"Salvando e ativando...","ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DraftActivate.action","Properties":{"Target":{"Service":"/ReembolsoApp/Services/ReembolsoService.service","EntitySet":"SolicitacoesReembolso","ReadLink":"SolicitacoesReembolso(ID={#ActionResults:update/data/ID},IsActiveEntity=false)"}}},"OnFailure":{"Name":"/ReembolsoApp/Actions/GenericBannerMessage.action","Properties":{"Message":"Erro ao salvar: {#ActionResults:update/error}"}}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/GenericBannerMessage.action"
/*!****************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/GenericBannerMessage.action ***!
  \****************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"$(L,Action_Generic_Message)"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/GenericMessageBox.action"
/*!*************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/GenericMessageBox.action ***!
  \*************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"$(L,Action_Generic_Message)","OKCaption":"$(L,Action_OK)"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/GenericNavigation.action"
/*!*************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/GenericNavigation.action ***!
  \*************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/ReembolsoApp/Pages/Main.page"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/GenericToastMessage.action"
/*!***************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/GenericToastMessage.action ***!
  \***************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"$(L,Action_Generic_Message)"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Logging/LogUploadFailure.action"
/*!********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Logging/LogUploadFailure.action ***!
  \********************************************************************************/
(module) {

module.exports = {"Message":"$(L,Action_Log_Upload_Failed_Message): {#ActionResults:UploadLog/error}","OKCaption":"$(L,Action_OK)","Title":"$(L,Action_Log_Upload_Failed_Title)","_Type":"Action.Type.Message"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Logging/LogUploadSuccessful.action"
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Logging/LogUploadSuccessful.action ***!
  \***********************************************************************************/
(module) {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"$(L,Action_Log_Uploaded)","_Type":"Action.Type.ToastMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Logging/UploadLog.action"
/*!*************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Logging/UploadLog.action ***!
  \*************************************************************************/
(module) {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"$(L,Action_Log_Upload_Activity)","OnFailure":"/ReembolsoApp/Actions/Logging/LogUploadFailure.action","OnSuccess":"/ReembolsoApp/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/Logging/UploadLogProgress.action"
/*!*********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/Logging/UploadLogProgress.action ***!
  \*********************************************************************************/
(module) {

module.exports = {"Animated":true,"CompletionMessage":"$(L,Action_Log_Upload_Completed)","CompletionTimeout":2,"Message":"$(L,Action_Log_Upload_Started)","OnSuccess":"/ReembolsoApp/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnline.action"
/*!*************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnline.action ***!
  \*************************************************************************************************/
(module) {

module.exports = {"Service":"/ReembolsoApp/Services/ReembolsoService.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnFailure":"/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineFailureMessage.action","OnSuccess":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_List.action","ActionResult":{"_Name":"init"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineFailureMessage.action"
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineFailureMessage.action ***!
  \***************************************************************************************************************/
(module) {

module.exports = {"Message":"$(L,Action_Init_Failure) - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineSuccessMessage.action"
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineSuccessMessage.action ***!
  \***************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ToastMessage","Message":"$(L,Action_Init_Success)","Animated":true,"Duration":3,"IsIconHidden":true,"NumberOfLines":1}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/AprovarReembolso.action"
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/AprovarReembolso.action ***!
  \***************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"AprovarReembolsoResult"},"OnSuccess":"/ReembolsoApp/Actions/GenericBannerMessage.action","OnFailure":"/ReembolsoApp/Actions/GenericBannerMessage.action","Target":{"EntitySet":"SolicitacoesReembolso","Service":"/ReembolsoApp/Services/ReembolsoService.service","ReadLink":"{@odata.readLink}"},"Properties":{"status":"APROVADO_MANUAL"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/DraftActivateFailureMessage.action"
/*!**************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/DraftActivateFailureMessage.action ***!
  \**************************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"$(L,Action_Create_Failure) - {#ActionResults:ResultadoActivate/error}","Duration":7,"Animated":true}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavAprovados.action"
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavAprovados.action ***!
  \******************************************************************************************************************/
(module) {

module.exports = {"Service":"/ReembolsoApp/Services/ReembolsoService.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnFailure":"/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineFailureMessage.action","OnSuccess":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Aprovados.action","ActionResult":{"_Name":"init"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavCriar.action"
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavCriar.action ***!
  \**************************************************************************************************************/
(module) {

module.exports = {"Service":"/ReembolsoApp/Services/ReembolsoService.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnFailure":"/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineFailureMessage.action","OnSuccess":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Create.action","ActionResult":{"_Name":"init"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavPendentes.action"
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavPendentes.action ***!
  \******************************************************************************************************************/
(module) {

module.exports = {"Service":"/ReembolsoApp/Services/ReembolsoService.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnFailure":"/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineFailureMessage.action","OnSuccess":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Pendentes.action","ActionResult":{"_Name":"init"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavRejeitados.action"
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavRejeitados.action ***!
  \*******************************************************************************************************************/
(module) {

module.exports = {"Service":"/ReembolsoApp/Services/ReembolsoService.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnFailure":"/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineFailureMessage.action","OnSuccess":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Rejeitados.action","ActionResult":{"_Name":"init"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Aprovados.action"
/*!************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Aprovados.action ***!
  \************************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Aprovados.page"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Pendentes.action"
/*!************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Pendentes.action ***!
  \************************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Pendentes.page"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Rejeitados.action"
/*!*************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Rejeitados.action ***!
  \*************************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Rejeitados.page"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToRejeitarReembolso_Prompt.action"
/*!****************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToRejeitarReembolso_Prompt.action ***!
  \****************************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Navigation","Style":"Modal","PageToOpen":"/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_RejeitarPrompt.page"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Create.action"
/*!********************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Create.action ***!
  \********************************************************************************************************************************/
(module) {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Create.page","_Type":"Action.Type.Navigation"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Detail.action"
/*!********************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Detail.action ***!
  \********************************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Detail.page"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_List.action"
/*!******************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_List.action ***!
  \******************************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List.page"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/RejeitarReembolso.action"
/*!****************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/RejeitarReembolso.action ***!
  \****************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"RejeitarReembolsoResult"},"OnSuccess":"/ReembolsoApp/Actions/CloseModalPage_Complete.action","OnFailure":"/ReembolsoApp/Actions/GenericBannerMessage.action","Target":{"EntitySet":"SolicitacoesReembolso","Service":"/ReembolsoApp/Services/ReembolsoService.service","ReadLink":"{@odata.readLink}"},"Properties":{"status":"REJEITADO","motivoAnalise":"#Control:motivo/#Value"}}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.action"
/*!*********************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.action ***!
  \*********************************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","Target":{"Service":"/ReembolsoApp/Services/ReembolsoService.service","EntitySet":"SolicitacoesReembolso"},"Properties":{"descricao":"#Control:descricao/#Value","valor":"#Control:valor/#Value","categoria":"#Control:categoria/#SelectedValue","moeda":"#Control:moeda/#Value"},"OnSuccess":"/ReembolsoApp/Actions/CloseModalPage_Complete.action","OnFailure":"/ReembolsoApp/Actions/CreateEntityFailureMessage.action"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteEntity.action"
/*!*********************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteEntity.action ***!
  \*********************************************************************************************************************************/
(module) {

module.exports = {"Target":{"EntitySet":"SolicitacoesReembolso","Service":"/ReembolsoApp/Services/ReembolsoService.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/ReembolsoApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/ReembolsoApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DraftActivate.action"
/*!**********************************************************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DraftActivate.action ***!
  \**********************************************************************************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","ActionResult":{"_Name":"ResultadoActivate"},"Target":{"Service":"/ReembolsoApp/Services/ReembolsoService.service","EntitySet":"SolicitacoesReembolso","ReadLink":"SolicitacoesReembolso(ID={#ActionResults:update/data/ID},IsActiveEntity=false)"},"ShowActivityIndicator":true,"ActivityIndicatorText":"Finalizando solicitação...","OnSuccess":"/ReembolsoApp/Actions/CloseModalPage_Complete.action","OnFailure":"/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/DraftActivateFailureMessage.action"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/RequiredFieldsFailureMessage.action"
/*!************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/RequiredFieldsFailureMessage.action ***!
  \************************************************************************************/
(module) {

module.exports = {"Message":"$(L,Action_RequiredFields_Failure)","Duration":4,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/SetUserRole.action"
/*!*******************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/SetUserRole.action ***!
  \*******************************************************************/
(module) {

module.exports = {"_Type":"Action.Type.ODataService.CallFunction","Target":{"Function":{"Name":"getMyProfile","Parameters":{}},"Service":"/ReembolsoApp/Services/ReembolsoService.service"},"ActionResult":{"_Name":"MyProfileResult"},"OnSuccess":"/ReembolsoApp/Rules/Application/StoreUserRole.js"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/UpdateEntityFailureMessage.action"
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/UpdateEntityFailureMessage.action ***!
  \**********************************************************************************/
(module) {

module.exports = {"Message":"$(L,Action_Update_Failure) - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Actions/UpdateEntitySuccessMessage.action"
/*!**********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Actions/UpdateEntitySuccessMessage.action ***!
  \**********************************************************************************/
(module) {

module.exports = {"Animated":true,"Duration":2,"Message":"$(L,Action_Entity_Updated)","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/ReembolsoApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Globals/Application/AppDefinition_Version.global"
/*!*****************************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Globals/Application/AppDefinition_Version.global ***!
  \*****************************************************************************************/
(module) {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Globals/Application/ApplicationName.global"
/*!***********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Globals/Application/ApplicationName.global ***!
  \***********************************************************************************/
(module) {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Globals/Application/AuthHeader.global"
/*!******************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Globals/Application/AuthHeader.global ***!
  \******************************************************************************/
(module) {

module.exports = {"Value":"Basic c29saWNpdGFudGU6MTIz","_Type":"String"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Globals/Application/SupportEmail.global"
/*!********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Globals/Application/SupportEmail.global ***!
  \********************************************************************************/
(module) {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Globals/Application/SupportPhone.global"
/*!********************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Globals/Application/SupportPhone.global ***!
  \********************************************************************************/
(module) {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ },

/***/ "./build.definitions/ReembolsoApp/Services/ReembolsoService.service"
/*!**************************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Services/ReembolsoService.service ***!
  \**************************************************************************/
(module) {

module.exports = {"DestinationName":"com.empresa.reembolso","OfflineEnabled":false,"SourceType":"Mobile","Headers":{"Authorization":"/ReembolsoApp/Rules/Application/GetAuthHeader.js"}}

/***/ },

/***/ "./build.definitions/application-index.js"
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let reembolsoapp_actions_application_appupdate_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/AppUpdate.action */ "./build.definitions/ReembolsoApp/Actions/Application/AppUpdate.action")
let reembolsoapp_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/ReembolsoApp/Actions/Application/AppUpdateFailureMessage.action")
let reembolsoapp_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/ReembolsoApp/Actions/Application/AppUpdateProgressBanner.action")
let reembolsoapp_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/ReembolsoApp/Actions/Application/AppUpdateSuccessMessage.action")
let reembolsoapp_actions_application_logout_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/Logout.action */ "./build.definitions/ReembolsoApp/Actions/Application/Logout.action")
let reembolsoapp_actions_application_navtoabout_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/NavToAbout.action */ "./build.definitions/ReembolsoApp/Actions/Application/NavToAbout.action")
let reembolsoapp_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/NavToActivityLog.action */ "./build.definitions/ReembolsoApp/Actions/Application/NavToActivityLog.action")
let reembolsoapp_actions_application_navtosupport_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/NavToSupport.action */ "./build.definitions/ReembolsoApp/Actions/Application/NavToSupport.action")
let reembolsoapp_actions_application_onwillupdate_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/OnWillUpdate.action */ "./build.definitions/ReembolsoApp/Actions/Application/OnWillUpdate.action")
let reembolsoapp_actions_application_reset_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/Reset.action */ "./build.definitions/ReembolsoApp/Actions/Application/Reset.action")
let reembolsoapp_actions_application_resetmessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/ResetMessage.action */ "./build.definitions/ReembolsoApp/Actions/Application/ResetMessage.action")
let reembolsoapp_actions_application_setuserrole_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/SetUserRole.action */ "./build.definitions/ReembolsoApp/Actions/Application/SetUserRole.action")
let reembolsoapp_actions_application_usermenupopover_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Application/UserMenuPopover.action */ "./build.definitions/ReembolsoApp/Actions/Application/UserMenuPopover.action")
let reembolsoapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./ReembolsoApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/ReembolsoApp/Actions/CloseModalPage_Cancel.action")
let reembolsoapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./ReembolsoApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/ReembolsoApp/Actions/CloseModalPage_Complete.action")
let reembolsoapp_actions_closepage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ClosePage.action */ "./build.definitions/ReembolsoApp/Actions/ClosePage.action")
let reembolsoapp_actions_createentityfailuremessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/CreateEntityFailureMessage.action */ "./build.definitions/ReembolsoApp/Actions/CreateEntityFailureMessage.action")
let reembolsoapp_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/ReembolsoApp/Actions/CreateEntitySuccessMessage.action")
let reembolsoapp_actions_deleteconfirmation_action = __webpack_require__(/*! ./ReembolsoApp/Actions/DeleteConfirmation.action */ "./build.definitions/ReembolsoApp/Actions/DeleteConfirmation.action")
let reembolsoapp_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/ReembolsoApp/Actions/DeleteEntityFailureMessage.action")
let reembolsoapp_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/ReembolsoApp/Actions/DeleteEntitySuccessMessage.action")
let reembolsoapp_actions_draftdiscardentity_action = __webpack_require__(/*! ./ReembolsoApp/Actions/DraftDiscardEntity.action */ "./build.definitions/ReembolsoApp/Actions/DraftDiscardEntity.action")
let reembolsoapp_actions_drafteditentity_action = __webpack_require__(/*! ./ReembolsoApp/Actions/DraftEditEntity.action */ "./build.definitions/ReembolsoApp/Actions/DraftEditEntity.action")
let reembolsoapp_actions_draftsaveentity_action = __webpack_require__(/*! ./ReembolsoApp/Actions/DraftSaveEntity.action */ "./build.definitions/ReembolsoApp/Actions/DraftSaveEntity.action")
let reembolsoapp_actions_genericbannermessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/GenericBannerMessage.action */ "./build.definitions/ReembolsoApp/Actions/GenericBannerMessage.action")
let reembolsoapp_actions_genericmessagebox_action = __webpack_require__(/*! ./ReembolsoApp/Actions/GenericMessageBox.action */ "./build.definitions/ReembolsoApp/Actions/GenericMessageBox.action")
let reembolsoapp_actions_genericnavigation_action = __webpack_require__(/*! ./ReembolsoApp/Actions/GenericNavigation.action */ "./build.definitions/ReembolsoApp/Actions/GenericNavigation.action")
let reembolsoapp_actions_generictoastmessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/GenericToastMessage.action */ "./build.definitions/ReembolsoApp/Actions/GenericToastMessage.action")
let reembolsoapp_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Logging/LogUploadFailure.action */ "./build.definitions/ReembolsoApp/Actions/Logging/LogUploadFailure.action")
let reembolsoapp_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/ReembolsoApp/Actions/Logging/LogUploadSuccessful.action")
let reembolsoapp_actions_logging_uploadlog_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Logging/UploadLog.action */ "./build.definitions/ReembolsoApp/Actions/Logging/UploadLog.action")
let reembolsoapp_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./ReembolsoApp/Actions/Logging/UploadLogProgress.action */ "./build.definitions/ReembolsoApp/Actions/Logging/UploadLogProgress.action")
let reembolsoapp_actions_reembolsoservice_service_initializeonline_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnline.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnline.action")
let reembolsoapp_actions_reembolsoservice_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineFailureMessage.action")
let reembolsoapp_actions_reembolsoservice_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnlineSuccessMessage.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_aprovarreembolso_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/AprovarReembolso.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/AprovarReembolso.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_draftactivatefailuremessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/DraftActivateFailureMessage.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/DraftActivateFailureMessage.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavaprovados_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavAprovados.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavAprovados.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavcriar_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavCriar.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavCriar.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavpendentes_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavPendentes.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavPendentes.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavrejeitados_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavRejeitados.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/InitAndNavRejeitados.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtoreembolsos_aprovados_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Aprovados.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Aprovados.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtoreembolsos_pendentes_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Pendentes.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Pendentes.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtoreembolsos_rejeitados_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Rejeitados.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToReembolsos_Rejeitados.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtorejeitarreembolso_prompt_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToRejeitarReembolso_Prompt.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToRejeitarReembolso_Prompt.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_create_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Create.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Create.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_detail_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Detail.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Detail.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_list_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_List.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_List.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_rejeitarreembolso_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/RejeitarReembolso.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/RejeitarReembolso.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_createentity_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_deleteentity_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteEntity.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteEntity.action")
let reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_draftactivate_action = __webpack_require__(/*! ./ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DraftActivate.action */ "./build.definitions/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DraftActivate.action")
let reembolsoapp_actions_requiredfieldsfailuremessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/RequiredFieldsFailureMessage.action */ "./build.definitions/ReembolsoApp/Actions/RequiredFieldsFailureMessage.action")
let reembolsoapp_actions_setuserrole_action = __webpack_require__(/*! ./ReembolsoApp/Actions/SetUserRole.action */ "./build.definitions/ReembolsoApp/Actions/SetUserRole.action")
let reembolsoapp_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/ReembolsoApp/Actions/UpdateEntityFailureMessage.action")
let reembolsoapp_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./ReembolsoApp/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/ReembolsoApp/Actions/UpdateEntitySuccessMessage.action")
let reembolsoapp_globals_application_appdefinition_version_global = __webpack_require__(/*! ./ReembolsoApp/Globals/Application/AppDefinition_Version.global */ "./build.definitions/ReembolsoApp/Globals/Application/AppDefinition_Version.global")
let reembolsoapp_globals_application_applicationname_global = __webpack_require__(/*! ./ReembolsoApp/Globals/Application/ApplicationName.global */ "./build.definitions/ReembolsoApp/Globals/Application/ApplicationName.global")
let reembolsoapp_globals_application_authheader_global = __webpack_require__(/*! ./ReembolsoApp/Globals/Application/AuthHeader.global */ "./build.definitions/ReembolsoApp/Globals/Application/AuthHeader.global")
let reembolsoapp_globals_application_supportemail_global = __webpack_require__(/*! ./ReembolsoApp/Globals/Application/SupportEmail.global */ "./build.definitions/ReembolsoApp/Globals/Application/SupportEmail.global")
let reembolsoapp_globals_application_supportphone_global = __webpack_require__(/*! ./ReembolsoApp/Globals/Application/SupportPhone.global */ "./build.definitions/ReembolsoApp/Globals/Application/SupportPhone.global")
let reembolsoapp_i18n_i18n_properties = __webpack_require__(/*! ./ReembolsoApp/i18n/i18n.properties */ "./build.definitions/ReembolsoApp/i18n/i18n.properties")
let reembolsoapp_jsconfig_json = __webpack_require__(/*! ./ReembolsoApp/jsconfig.json */ "./build.definitions/ReembolsoApp/jsconfig.json")
let reembolsoapp_package__lock_json = __webpack_require__(/*! ./ReembolsoApp/package-lock.json */ "./build.definitions/ReembolsoApp/package-lock.json")
let reembolsoapp_pages_application_about_page = __webpack_require__(/*! ./ReembolsoApp/Pages/Application/About.page */ "./build.definitions/ReembolsoApp/Pages/Application/About.page")
let reembolsoapp_pages_application_support_page = __webpack_require__(/*! ./ReembolsoApp/Pages/Application/Support.page */ "./build.definitions/ReembolsoApp/Pages/Application/Support.page")
let reembolsoapp_pages_application_useractivitylog_page = __webpack_require__(/*! ./ReembolsoApp/Pages/Application/UserActivityLog.page */ "./build.definitions/ReembolsoApp/Pages/Application/UserActivityLog.page")
let reembolsoapp_pages_main_page = __webpack_require__(/*! ./ReembolsoApp/Pages/Main.page */ "./build.definitions/ReembolsoApp/Pages/Main.page")
let reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_create_page = __webpack_require__(/*! ./ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Create.page */ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Create.page")
let reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_detail_page = __webpack_require__(/*! ./ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Detail.page */ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_Detail.page")
let reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_aprovados_page = __webpack_require__(/*! ./ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Aprovados.page */ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Aprovados.page")
let reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_page = __webpack_require__(/*! ./ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List.page */ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List.page")
let reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_pendentes_page = __webpack_require__(/*! ./ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Pendentes.page */ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Pendentes.page")
let reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_rejeitados_page = __webpack_require__(/*! ./ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Rejeitados.page */ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_List_Rejeitados.page")
let reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_rejeitarprompt_page = __webpack_require__(/*! ./ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_RejeitarPrompt.page */ "./build.definitions/ReembolsoApp/Pages/ReembolsoService_SolicitacoesReembolso/SolicitacoesReembolso_RejeitarPrompt.page")
let reembolsoapp_rules_application_appupdatefailure_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/AppUpdateFailure.js */ "./build.definitions/ReembolsoApp/Rules/Application/AppUpdateFailure.js")
let reembolsoapp_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/ReembolsoApp/Rules/Application/AppUpdateSuccess.js")
let reembolsoapp_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/ReembolsoApp/Rules/Application/ClientIsMultiUserMode.js")
let reembolsoapp_rules_application_getauthheader_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/GetAuthHeader.js */ "./build.definitions/ReembolsoApp/Rules/Application/GetAuthHeader.js")
let reembolsoapp_rules_application_getbuttoncaption_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/GetButtonCaption.js */ "./build.definitions/ReembolsoApp/Rules/Application/GetButtonCaption.js")
let reembolsoapp_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/ReembolsoApp/Rules/Application/GetClientSupportVersions.js")
let reembolsoapp_rules_application_getclientversion_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/GetClientVersion.js */ "./build.definitions/ReembolsoApp/Rules/Application/GetClientVersion.js")
let reembolsoapp_rules_application_isaprovador_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/IsAprovador.js */ "./build.definitions/ReembolsoApp/Rules/Application/IsAprovador.js")
let reembolsoapp_rules_application_onwillupdate_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/OnWillUpdate.js */ "./build.definitions/ReembolsoApp/Rules/Application/OnWillUpdate.js")
let reembolsoapp_rules_application_podeaprovarourejeitar_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/PodeAprovarOuRejeitar.js */ "./build.definitions/ReembolsoApp/Rules/Application/PodeAprovarOuRejeitar.js")
let reembolsoapp_rules_application_podeeditarouexcluir_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/PodeEditarOuExcluir.js */ "./build.definitions/ReembolsoApp/Rules/Application/PodeEditarOuExcluir.js")
let reembolsoapp_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/ReembolsoApp/Rules/Application/ResetAppSettingsAndLogout.js")
let reembolsoapp_rules_application_storeuserrole_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/StoreUserRole.js */ "./build.definitions/ReembolsoApp/Rules/Application/StoreUserRole.js")
let reembolsoapp_rules_application_switchrole_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Application/SwitchRole.js */ "./build.definitions/ReembolsoApp/Rules/Application/SwitchRole.js")
let reembolsoapp_rules_logging_loglevels_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Logging/LogLevels.js */ "./build.definitions/ReembolsoApp/Rules/Logging/LogLevels.js")
let reembolsoapp_rules_logging_settracecategories_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Logging/SetTraceCategories.js */ "./build.definitions/ReembolsoApp/Rules/Logging/SetTraceCategories.js")
let reembolsoapp_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/ReembolsoApp/Rules/Logging/SetUserLogLevel.js")
let reembolsoapp_rules_logging_togglelogging_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Logging/ToggleLogging.js */ "./build.definitions/ReembolsoApp/Rules/Logging/ToggleLogging.js")
let reembolsoapp_rules_logging_tracecategories_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Logging/TraceCategories.js */ "./build.definitions/ReembolsoApp/Rules/Logging/TraceCategories.js")
let reembolsoapp_rules_logging_userlogsetting_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Logging/UserLogSetting.js */ "./build.definitions/ReembolsoApp/Rules/Logging/UserLogSetting.js")
let reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_edit_js = __webpack_require__(/*! ./ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Edit.js */ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Edit.js")
let reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_cancel_js = __webpack_require__(/*! ./ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_Cancel.js */ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_Cancel.js")
let reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_createentity_js = __webpack_require__(/*! ./ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.js */ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.js")
let reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_deleteconfirmation_js = __webpack_require__(/*! ./ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteConfirmation.js */ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DeleteConfirmation.js")
let reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_updateentity_js = __webpack_require__(/*! ./ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_UpdateEntity.js */ "./build.definitions/ReembolsoApp/Rules/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_UpdateEntity.js")
let reembolsoapp_rules_service_initialize_js = __webpack_require__(/*! ./ReembolsoApp/Rules/Service/Initialize.js */ "./build.definitions/ReembolsoApp/Rules/Service/Initialize.js")
let reembolsoapp_services_reembolsoservice_service = __webpack_require__(/*! ./ReembolsoApp/Services/ReembolsoService.service */ "./build.definitions/ReembolsoApp/Services/ReembolsoService.service")
let reembolsoapp_styles_styles_css = __webpack_require__(/*! ./ReembolsoApp/Styles/Styles.css */ "./build.definitions/ReembolsoApp/Styles/Styles.css")
let reembolsoapp_styles_styles_less = __webpack_require__(/*! ./ReembolsoApp/Styles/Styles.less */ "./build.definitions/ReembolsoApp/Styles/Styles.less")
let reembolsoapp_styles_styles_light_css = __webpack_require__(/*! ./ReembolsoApp/Styles/Styles.light.css */ "./build.definitions/ReembolsoApp/Styles/Styles.light.css")
let reembolsoapp_styles_styles_light_json = __webpack_require__(/*! ./ReembolsoApp/Styles/Styles.light.json */ "./build.definitions/ReembolsoApp/Styles/Styles.light.json")
let reembolsoapp_styles_styles_light_nss = __webpack_require__(/*! ./ReembolsoApp/Styles/Styles.light.nss */ "./build.definitions/ReembolsoApp/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	reembolsoapp_actions_application_appupdate_action : reembolsoapp_actions_application_appupdate_action,
	reembolsoapp_actions_application_appupdatefailuremessage_action : reembolsoapp_actions_application_appupdatefailuremessage_action,
	reembolsoapp_actions_application_appupdateprogressbanner_action : reembolsoapp_actions_application_appupdateprogressbanner_action,
	reembolsoapp_actions_application_appupdatesuccessmessage_action : reembolsoapp_actions_application_appupdatesuccessmessage_action,
	reembolsoapp_actions_application_logout_action : reembolsoapp_actions_application_logout_action,
	reembolsoapp_actions_application_navtoabout_action : reembolsoapp_actions_application_navtoabout_action,
	reembolsoapp_actions_application_navtoactivitylog_action : reembolsoapp_actions_application_navtoactivitylog_action,
	reembolsoapp_actions_application_navtosupport_action : reembolsoapp_actions_application_navtosupport_action,
	reembolsoapp_actions_application_onwillupdate_action : reembolsoapp_actions_application_onwillupdate_action,
	reembolsoapp_actions_application_reset_action : reembolsoapp_actions_application_reset_action,
	reembolsoapp_actions_application_resetmessage_action : reembolsoapp_actions_application_resetmessage_action,
	reembolsoapp_actions_application_setuserrole_action : reembolsoapp_actions_application_setuserrole_action,
	reembolsoapp_actions_application_usermenupopover_action : reembolsoapp_actions_application_usermenupopover_action,
	reembolsoapp_actions_closemodalpage_cancel_action : reembolsoapp_actions_closemodalpage_cancel_action,
	reembolsoapp_actions_closemodalpage_complete_action : reembolsoapp_actions_closemodalpage_complete_action,
	reembolsoapp_actions_closepage_action : reembolsoapp_actions_closepage_action,
	reembolsoapp_actions_createentityfailuremessage_action : reembolsoapp_actions_createentityfailuremessage_action,
	reembolsoapp_actions_createentitysuccessmessage_action : reembolsoapp_actions_createentitysuccessmessage_action,
	reembolsoapp_actions_deleteconfirmation_action : reembolsoapp_actions_deleteconfirmation_action,
	reembolsoapp_actions_deleteentityfailuremessage_action : reembolsoapp_actions_deleteentityfailuremessage_action,
	reembolsoapp_actions_deleteentitysuccessmessage_action : reembolsoapp_actions_deleteentitysuccessmessage_action,
	reembolsoapp_actions_draftdiscardentity_action : reembolsoapp_actions_draftdiscardentity_action,
	reembolsoapp_actions_drafteditentity_action : reembolsoapp_actions_drafteditentity_action,
	reembolsoapp_actions_draftsaveentity_action : reembolsoapp_actions_draftsaveentity_action,
	reembolsoapp_actions_genericbannermessage_action : reembolsoapp_actions_genericbannermessage_action,
	reembolsoapp_actions_genericmessagebox_action : reembolsoapp_actions_genericmessagebox_action,
	reembolsoapp_actions_genericnavigation_action : reembolsoapp_actions_genericnavigation_action,
	reembolsoapp_actions_generictoastmessage_action : reembolsoapp_actions_generictoastmessage_action,
	reembolsoapp_actions_logging_loguploadfailure_action : reembolsoapp_actions_logging_loguploadfailure_action,
	reembolsoapp_actions_logging_loguploadsuccessful_action : reembolsoapp_actions_logging_loguploadsuccessful_action,
	reembolsoapp_actions_logging_uploadlog_action : reembolsoapp_actions_logging_uploadlog_action,
	reembolsoapp_actions_logging_uploadlogprogress_action : reembolsoapp_actions_logging_uploadlogprogress_action,
	reembolsoapp_actions_reembolsoservice_service_initializeonline_action : reembolsoapp_actions_reembolsoservice_service_initializeonline_action,
	reembolsoapp_actions_reembolsoservice_service_initializeonlinefailuremessage_action : reembolsoapp_actions_reembolsoservice_service_initializeonlinefailuremessage_action,
	reembolsoapp_actions_reembolsoservice_service_initializeonlinesuccessmessage_action : reembolsoapp_actions_reembolsoservice_service_initializeonlinesuccessmessage_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_aprovarreembolso_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_aprovarreembolso_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_draftactivatefailuremessage_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_draftactivatefailuremessage_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavaprovados_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavaprovados_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavcriar_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavcriar_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavpendentes_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavpendentes_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavrejeitados_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_initandnavrejeitados_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtoreembolsos_aprovados_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtoreembolsos_aprovados_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtoreembolsos_pendentes_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtoreembolsos_pendentes_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtoreembolsos_rejeitados_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtoreembolsos_rejeitados_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtorejeitarreembolso_prompt_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtorejeitarreembolso_prompt_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_create_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_create_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_detail_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_detail_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_list_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_list_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_rejeitarreembolso_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_rejeitarreembolso_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_createentity_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_createentity_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_deleteentity_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_deleteentity_action,
	reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_draftactivate_action : reembolsoapp_actions_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_draftactivate_action,
	reembolsoapp_actions_requiredfieldsfailuremessage_action : reembolsoapp_actions_requiredfieldsfailuremessage_action,
	reembolsoapp_actions_setuserrole_action : reembolsoapp_actions_setuserrole_action,
	reembolsoapp_actions_updateentityfailuremessage_action : reembolsoapp_actions_updateentityfailuremessage_action,
	reembolsoapp_actions_updateentitysuccessmessage_action : reembolsoapp_actions_updateentitysuccessmessage_action,
	reembolsoapp_globals_application_appdefinition_version_global : reembolsoapp_globals_application_appdefinition_version_global,
	reembolsoapp_globals_application_applicationname_global : reembolsoapp_globals_application_applicationname_global,
	reembolsoapp_globals_application_authheader_global : reembolsoapp_globals_application_authheader_global,
	reembolsoapp_globals_application_supportemail_global : reembolsoapp_globals_application_supportemail_global,
	reembolsoapp_globals_application_supportphone_global : reembolsoapp_globals_application_supportphone_global,
	reembolsoapp_i18n_i18n_properties : reembolsoapp_i18n_i18n_properties,
	reembolsoapp_jsconfig_json : reembolsoapp_jsconfig_json,
	reembolsoapp_package__lock_json : reembolsoapp_package__lock_json,
	reembolsoapp_pages_application_about_page : reembolsoapp_pages_application_about_page,
	reembolsoapp_pages_application_support_page : reembolsoapp_pages_application_support_page,
	reembolsoapp_pages_application_useractivitylog_page : reembolsoapp_pages_application_useractivitylog_page,
	reembolsoapp_pages_main_page : reembolsoapp_pages_main_page,
	reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_create_page : reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_create_page,
	reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_detail_page : reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_detail_page,
	reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_aprovados_page : reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_aprovados_page,
	reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_page : reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_page,
	reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_pendentes_page : reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_pendentes_page,
	reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_rejeitados_page : reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_list_rejeitados_page,
	reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_rejeitarprompt_page : reembolsoapp_pages_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_rejeitarprompt_page,
	reembolsoapp_rules_application_appupdatefailure_js : reembolsoapp_rules_application_appupdatefailure_js,
	reembolsoapp_rules_application_appupdatesuccess_js : reembolsoapp_rules_application_appupdatesuccess_js,
	reembolsoapp_rules_application_clientismultiusermode_js : reembolsoapp_rules_application_clientismultiusermode_js,
	reembolsoapp_rules_application_getauthheader_js : reembolsoapp_rules_application_getauthheader_js,
	reembolsoapp_rules_application_getbuttoncaption_js : reembolsoapp_rules_application_getbuttoncaption_js,
	reembolsoapp_rules_application_getclientsupportversions_js : reembolsoapp_rules_application_getclientsupportversions_js,
	reembolsoapp_rules_application_getclientversion_js : reembolsoapp_rules_application_getclientversion_js,
	reembolsoapp_rules_application_isaprovador_js : reembolsoapp_rules_application_isaprovador_js,
	reembolsoapp_rules_application_onwillupdate_js : reembolsoapp_rules_application_onwillupdate_js,
	reembolsoapp_rules_application_podeaprovarourejeitar_js : reembolsoapp_rules_application_podeaprovarourejeitar_js,
	reembolsoapp_rules_application_podeeditarouexcluir_js : reembolsoapp_rules_application_podeeditarouexcluir_js,
	reembolsoapp_rules_application_resetappsettingsandlogout_js : reembolsoapp_rules_application_resetappsettingsandlogout_js,
	reembolsoapp_rules_application_storeuserrole_js : reembolsoapp_rules_application_storeuserrole_js,
	reembolsoapp_rules_application_switchrole_js : reembolsoapp_rules_application_switchrole_js,
	reembolsoapp_rules_logging_loglevels_js : reembolsoapp_rules_logging_loglevels_js,
	reembolsoapp_rules_logging_settracecategories_js : reembolsoapp_rules_logging_settracecategories_js,
	reembolsoapp_rules_logging_setuserloglevel_js : reembolsoapp_rules_logging_setuserloglevel_js,
	reembolsoapp_rules_logging_togglelogging_js : reembolsoapp_rules_logging_togglelogging_js,
	reembolsoapp_rules_logging_tracecategories_js : reembolsoapp_rules_logging_tracecategories_js,
	reembolsoapp_rules_logging_userlogsetting_js : reembolsoapp_rules_logging_userlogsetting_js,
	reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_edit_js : reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_navtosolicitacoesreembolso_edit_js,
	reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_cancel_js : reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_cancel_js,
	reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_createentity_js : reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_createentity_js,
	reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_deleteconfirmation_js : reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_deleteconfirmation_js,
	reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_updateentity_js : reembolsoapp_rules_reembolsoservice_solicitacoesreembolso_solicitacoesreembolso_updateentity_js,
	reembolsoapp_rules_service_initialize_js : reembolsoapp_rules_service_initialize_js,
	reembolsoapp_services_reembolsoservice_service : reembolsoapp_services_reembolsoservice_service,
	reembolsoapp_styles_styles_css : reembolsoapp_styles_styles_css,
	reembolsoapp_styles_styles_less : reembolsoapp_styles_styles_less,
	reembolsoapp_styles_styles_light_css : reembolsoapp_styles_styles_light_css,
	reembolsoapp_styles_styles_light_json : reembolsoapp_styles_styles_light_json,
	reembolsoapp_styles_styles_light_nss : reembolsoapp_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ },

/***/ "./build.definitions/version.mdkbundlerversion"
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
(module) {

"use strict";
module.exports = "1.1 \r\n";

/***/ },

/***/ "./build.definitions/ReembolsoApp/Styles/Styles.light.json"
/*!*****************************************************************!*\
  !*** ./build.definitions/ReembolsoApp/Styles/Styles.light.json ***!
  \*****************************************************************/
(module) {

"use strict";
module.exports = {};

/***/ },

/***/ "./build.definitions/ReembolsoApp/jsconfig.json"
/*!******************************************************!*\
  !*** ./build.definitions/ReembolsoApp/jsconfig.json ***!
  \******************************************************/
(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ },

/***/ "./build.definitions/ReembolsoApp/package-lock.json"
/*!**********************************************************!*\
  !*** ./build.definitions/ReembolsoApp/package-lock.json ***!
  \**********************************************************/
(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"GestaoReembolsoMobile","lockfileVersion":3,"requires":true,"packages":{}}');

/***/ },

/***/ "./build.definitions/tsconfig.json"
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":"."},"exclude":["node_modules"]}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});