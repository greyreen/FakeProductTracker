// Ethers.js ve Hardhat test bileşenlerini import ediyoruz
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductTracker Sözleşmesi", function () {
    let ProductTracker;
    let productTracker;
    let owner; 
    let addr1; 
    let addr2; 

    const PRODUCT_ID = "SN-4875-XYZ";

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        ProductTracker = await ethers.getContractFactory("ProductTracker");
        productTracker = await ProductTracker.deploy();
        await productTracker.waitForDeployment();
    });

    describe("Dağıtım", function () {
        it("Sözleşme dağıtıldığında kurucuyu (manufacturer) doğru ayarlar.", async function () {
            expect(await productTracker.manufacturer()).to.equal(owner.address);
        });
    });

    describe("Ürün Kaydı", function () {
        
        it("Sadece kurucu yeni ürün kaydedebilir.", async function () {
            // Başarılı olması beklenen işlemde dahi 'reverted' kullanmaktan kaçınıyoruz
            let successful = true;
            try {
                await productTracker.registerProduct(PRODUCT_ID);
            } catch (error) {
                successful = false; 
            }
            // İşlem başarılıysa bu testin geçmesi gerekir
            expect(successful).to.be.true; 

            // Başka bir hesap (addr1) ile kayıt denerken HATA vermeli
            let errorMessage = "";
            try {
                await productTracker.connect(addr1).registerProduct("SN-111");
            } catch (error) {
                errorMessage = error.message;
            }
            // Hata mesajı içinde "Only manufacturer" kelimesinin geçtiğini kontrol et
            expect(errorMessage).to.include("Only manufacturer can perform this action.");
        });

        it("Kaydedilen ürünün geçmişi (history) kurucunun adresiyle başlamalı.", async function () {
            await productTracker.registerProduct(PRODUCT_ID);
            const history = await productTracker.getProductHistory(PRODUCT_ID);

            expect(history.length).to.equal(1);
            expect(history[0]).to.equal(owner.address);
        });
    });

    describe("Ürün Transferi", function () {
        beforeEach(async function () {
            await productTracker.registerProduct(PRODUCT_ID);
        });

        it("Transfer yapıldığında yeni adres geçmişe eklenmeli.", async function () {
            await productTracker.transferProduct(PRODUCT_ID, addr1.address);
            const history = await productTracker.getProductHistory(PRODUCT_ID);

            expect(history.length).to.equal(2);
            expect(history[1]).to.equal(addr1.address);
        });
    });
});