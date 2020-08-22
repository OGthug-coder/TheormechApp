class StickerShopService {
    constructor(api) {
        this.api = api;
    }

    getAllStickers() {
        return this.api.requestStickers();
    }

    setActiveSticker(userId, stickerId) {
        return this.api.setActiveSticker(userId, stickerId);
    }

    vibrate(type) {
        this.api.vibrateSelectionChanged();
    }

    buySticker(userId, stickerId) {
        return this.api.buySticker(userId, stickerId);
    }

}

export default StickerShopService;