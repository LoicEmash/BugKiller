/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('BugKiller.Global', {
    singleton: true,
    userMail: '',
    userPassword: '',
    userId: null,
    userClient: null,
    userIsAdmin: false,
    
    workflow: {
        user: {
            open: [
            ],
            ask: [
                'answer'
            ],
            answer: [
                'answer'
            ],
            closed: [
                'open'
            ],
            delivery: [
                'answer'
            ],
            watch: [
                'answer'
            ],
            resolved: [
                'open'
            ],
            unknow: [
            ]
        },
        admin: {
            open: [
                'delivery'
            ],
            ask: [
                'ask',
                'closed',
                'resolved',
                'watch'
            ],
            answer: [
                'ask',
                'closed',
                'resolved',
                'watch'
            ],
            closed: [
                'open'
            ],
            delivery: [
                'ask',
                'closed',
                'resolved',
                'watch'
            ],
            watch: [
                'ask',
                'closed',
                'resolved',
                'watch'
            ],
            resolved: [
                'open'
            ],
            unknow: [
                'open',
                'ask',
                'closed',
                'delivery',
                'watch',
                'resolved'
            ]
        }
    }
});

