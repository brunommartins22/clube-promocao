import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'slim';

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    slimMenuActive: boolean;

    slimMenuAnchor: boolean;

    toggleMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutMenuScroller: HTMLDivElement;

    lightMenu = false;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    resetMenu: boolean;

    menuHoverActive: boolean;

    rightPanelActive: boolean;

    rightPanelClick: boolean;

    onLayoutClick() {




        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.rightPanelClick) {
            this.rightPanelActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal()) {
                this.resetMenu = true;
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            if (this.slimMenuActive) {
                this.hideSlimMenu();
            }

            if (this.toggleMenuActive) {
                this.hideToggleMenu();
            }

            this.menuHoverActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarMenuActive = false;

        if (this.isOverlay()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        if (this.isToggle()) {
            this.toggleMenuActive = !this.toggleMenuActive;
        }
        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;
    }

    onAnchorClick(event) {
        if (this.isSlim()) {
            this.slimMenuAnchor = !this.slimMenuAnchor;
        }
        event.preventDefault();
    }

    onMenuMouseEnter(event) {
        if (this.isSlim()) {
            this.slimMenuActive = true;
        }
    }

    onMenuMouseLeave(event) {
        if (this.isSlim()) {
            this.slimMenuActive = false;
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    }

    onRightPanelClick() {
        this.rightPanelClick = true;
    }

    isHorizontal() {
        return this.menuMode === 'horizontal';
    }

    isSlim() {
        return this.menuMode === 'slim';
    }

    isOverlay() {
        return this.menuMode === 'overlay';
    }

    isToggle() {
        return this.menuMode === 'toggle';
    }

    isStatic() {
        return this.menuMode === 'static';
    }

    isMobile() {
        return window.innerWidth < 1281;
    }

    isDesktop() {
        return window.innerWidth > 1280;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1280 && width > 640;
    }

    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    hideSlimMenu() {
        this.slimMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    hideToggleMenu() {
        this.toggleMenuActive = false;
        this.staticMenuMobileActive = false;
    }
}
