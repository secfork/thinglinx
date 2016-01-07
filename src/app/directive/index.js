import initFrameWorkDir from "./foramework";

import panel from "./panel";

import table from "./table/tableClass"; 

import panelInputGroup from "./input/panel_input_group";
import  panelInput  from "./input/panel_input";


export default (module) => {

    initFrameWorkDir(module);


    module.directive("tlPanel", panel)

        .directive("tlTableClass", table) 

        .directive("tlPanelInputs", panelInputGroup)
        .directive("tlPanelInput" , panelInput )




}
