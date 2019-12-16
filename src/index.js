import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//mdb
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

//pages
import Evento from '../src/pages/evento/Evento';
import EventosGerais from './pages/EventosGerais/EventosGerais';
import DescricaoEventoUsuario from './pages/descricaoEventoUsuario/DescricaoEventoUsuario';
import DescricaoEventoAdm from './pages/descricaoEventoAdm/DescricaoEventoAdm';
import Perfil from './pages/perfil/Perfil';
import NotFound from './pages/NotFound';
import MeusEventos from './pages/MeusEventos/MeusEventos';
import GerenciarEventos from './pages/GerenciarEventos/GerenciarEventos';
import Categoria from './pages/categoria/Categoria';
import CadastrarUsuario from './pages/cadastrar_usuario/CadastrarUsuario';
import TornarAdministrador from './pages/tornar_administrador/TornarAdministrador';
import EventosAprovados from './pages/eventos_aprovados/EventosAprovados';
import Home from './pages/home/Home';
import CadastrarComunidade from './pages/cadastrar_comunidade/CadastrarComunidade';


//rotas
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import Login from './pages/login/Login';
import { isAuthenticated, parseToken } from './services/auth';



const Administrador = ({ component: Component }) => (
    <Route
        render={props =>
            isAuthenticated() && parseToken().Roles === 'Administrador' ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathame:'/' }} />
                )
        }
    />
)

const Usuario = ({ component: Component }) => (
    <Route
        render={props =>
            isAuthenticated() && parseToken().Roles === 'Comunidade' ? (
                <Component {...props} />
            ) : isAuthenticated() && parseToken().Roles === 'Funcionario' ? (
                <Component {...props} />
            ) : isAuthenticated() && parseToken().Roles === 'Administrador' ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname:'/' }} />
                )
        }
    />
)






const Rotas = (
    <Router>
        <div>
            <Switch>

                <Route exact path="/" component={Home} />
                <Route path="/Login" component={Login} />
                <Usuario path="/Meuseventos" component={MeusEventos} />
                <Usuario path="/Evento" component={Evento}/>
               <Route path="/Descricao" component={DescricaoEventoUsuario}/>
               <Route path="/EventosGerais" component={EventosGerais}/>
                <Usuario path="/MeuPerfil" component={Perfil} />
                <Administrador path="/DescricaoEventoAdm" component={DescricaoEventoAdm} />
                <Administrador path='/Categoria' component={Categoria} />
                <Administrador path="/GerenciarEventos" component={GerenciarEventos} />
                <Route path="/CadastrarUsuario" component={CadastrarUsuario} />
                <Route path="/CadastrarComunidade" component={CadastrarComunidade} />
                <Administrador path="/TornarAdministrador" component={TornarAdministrador} />
                <Administrador path="/EventosAprovados" component={EventosAprovados} />
                <Route component={NotFound} />

            </Switch>
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
