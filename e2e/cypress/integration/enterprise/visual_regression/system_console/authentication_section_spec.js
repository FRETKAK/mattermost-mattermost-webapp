// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***************************************************************
// - [#] indicates a test step (e.g. # Go to a page)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element ID when selecting an element. Create one if none.
// ***************************************************************

// Stage: @prod
// Group: @enterprise @system_console @visual_regression

import * as TIMEOUTS from '../../../../fixtures/timeouts';

describe('System Console - Authentication', () => {
    const testCases = [
        {
            section: 'Authentication',
            header: 'Signup',
            sidebar: 'Signup',
            url: 'admin_console/authentication/signup',
        },
        {
            section: 'Authentication',
            header: 'Email Authentication',
            sidebar: 'Email',
            url: 'admin_console/authentication/email',
        },
        {
            section: 'Authentication',
            header: 'Password',
            sidebar: 'Password',
            url: 'admin_console/authentication/password',
        },
        {
            section: 'Authentication',
            header: 'Multi-factor Authentication',
            sidebar: 'MFA',
            url: 'admin_console/authentication/mfa',
        },
        {
            section: 'Authentication',
            header: 'AD/LDAP',
            sidebar: 'AD/LDAP',
            url: 'admin_console/authentication/ldap',
        },
        {
            section: 'Authentication',
            header: 'SAML 2.0',
            sidebar: 'SAML 2.0',
            url: 'admin_console/authentication/saml',
        },
        {
            section: 'Authentication',
            header: 'OpenID Connect',
            sidebar: 'OpenID Connect',
            url: 'admin_console/authentication/openid',
        },
        {
            section: 'Authentication',
            header: 'Guest Access',
            sidebar: 'Guest Access',
            url: 'admin_console/authentication/guest_access',
        },
    ];

    before(() => {
        // # Go to system admin then verify admin console URL and header
        cy.visit('/admin_console/about/license');
        cy.url().should('include', '/admin_console/about/license');
        cy.get('.admin-console', {timeout: TIMEOUTS.HALF_MIN}).should('be.visible').within(() => {
            cy.get('.admin-console__header').should('be.visible').and('have.text', 'Edition and License');
        });
    });

    testCases.forEach((testCase) => {
        it(`${testCase.section} - ${testCase.header}`, () => {
            // # Click the link on the sidebar
            cy.get('.admin-sidebar').should('be.visible').within(() => {
                cy.findByText(testCase.sidebar).scrollIntoView().should('be.visible').click();
            });

            // * Verify that it redirects to the URL and matches with the header
            cy.url().should('include', testCase.url);
            cy.get('.admin-console').should('be.visible').within(() => {
                cy.get('.admin-console__header').should('be.visible').and(testCase.headerContains ? 'contain' : 'have.text', testCase.header);
            });
        });
    });
});
