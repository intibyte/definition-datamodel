import Abcd from './components/Abcd.vue'
import Component from './components/Component'

const version = __UI_VERSION__

function install (app) {
	app.component(Component.name, Component)
	app.component(Abcd.__name, Abcd)

}

export {
	version,
	Component,

	install
}
