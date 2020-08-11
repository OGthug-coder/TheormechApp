class StickerShopService {
    constructor(api) {
        this.api = api;
    }

    getAllStickers() {
        return this.api.requestStickers();
    }

    setActiveSticker(userId, stickerId) {
        this.api.setActiveSticker(userId, stickerId);
    }

    buySticker(userId, stickerId) {
        return this.api.buySticker(userId, stickerId);
    }

}

export default StickerShopService;