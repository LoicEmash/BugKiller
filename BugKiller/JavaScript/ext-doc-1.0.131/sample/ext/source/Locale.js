/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('BugKiller.Locale', {
    singleton: true,
    severityValues : {
        minor:'Mineur',
        major:'Majeur',
        critical : 'Critique'
    },
    priorityValues : {
        minor:'Mineur',
        major:'Majeur',
        critical : 'Critique'
    },
    reproductibilityValues :
    {
        yes:'Oui',
        no:'Non'
    },
    stateValues : {
        open:'Ouvert',
        closed:'Fermer',
        resolved : 'Résolu',
        answer : 'Réponse information',
        unknow : 'Inconu',
        delivery:'Accusé de réception',
        ask:'Demande d\'information',
        watch:'En cours d\'examen'
    }
});


