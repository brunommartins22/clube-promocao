import {ManhattanPage} from './app.po';

describe('workspace-project App', () => {
    let page: ManhattanPage;

    beforeEach(() => {
        page = new ManhattanPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome to Avalon!');
    });
});
