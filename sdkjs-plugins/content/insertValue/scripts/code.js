/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function(window, undefined){

	var isInit = false


	window.Add = function (field_type) {
		if (!isInit)
			return

		Asc.scope.text = field_type;

		/* var sScript = "var oDocument = Api.GetDocument();"
		sScript += "var oParagraph = Api.CreateParagraph();"
		sScript += "oParagraph.AddText(\'" + field_type + "\');"
		sScript += "oDocument.InsertContent([oParagraph], false, {KeepTextOnly: true});" */
		window.Asc.plugin.info.recalculate = true
		// window.Asc.plugin.executeCommand("command", sScript)
		let command = () => {
			switch (Asc.scope.editorType) {
				case "word":
					const oDocument = Api.GetDocument()
					const oParagraph = Api.CreateParagraph()

					oParagraph.AddText(Asc.scope.text)
					oDocument.InsertContent([oParagraph], false, { KeepTextOnly: true })
					break
				case "cell":
					// var oWorksheet = Api.GetActiveSheet()
					Api.GetSelection().SetValue(Asc.scope.text)
					break
				case "slide": {

					break
				}
			}
		}

		window.Asc.plugin.callCommand(command, false, true)

	}
	window.Mark = function () {
		return window.Add("${DynamicTable}")
	}

	window.Asc.plugin.init = function () {
		isInit = true
		Asc.scope.editorType = this.info.editorType

		console.log('插件执行了！！！！！！！')
	}

	window.Asc.plugin.button = function (id) {
		if (-1 == id)
			this.executeCommand("close", "")
	}

})(window, undefined);
