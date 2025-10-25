// contracts/ProductTracker.sol içeriği

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Sürümün bu olduğundan emin olun!

contract ProductTracker {
    // Sözleşmeyi dağıtan kişi "Üretici" yetkisine sahip olacak
    address public manufacturer;

    // Her ürünün bir geçmişi (transferler) olacak.
    struct Product {
        string serialNumber; 
        uint registrationTimestamp; 
        address registeredBy; 
        address[] history; 
    }

    // Ürünleri, seri numaralarını kullanarak (string) depolamak için bir eşleme (mapping)
    mapping(string => Product) public products;

    // Sözleşme ilk kurulduğunda (deploy edildiğinde) çalışır.
    constructor() {
        manufacturer = msg.sender;
    }

    // Sadece üreticinin bu fonksiyonu çağırabileceğini garanti eden değiştirici (modifier).
    modifier onlyManufacturer() {
        require(msg.sender == manufacturer, "Only manufacturer can perform this action.");
        _;
    }

    // YENİ ÜRÜN KAYIT FONKSİYONU
    function registerProduct(string memory _serialNumber) public onlyManufacturer {
        require(products[_serialNumber].registrationTimestamp == 0, "Product already registered.");

        Product storage newProduct = products[_serialNumber];
        newProduct.serialNumber = _serialNumber;
        newProduct.registrationTimestamp = block.timestamp;
        newProduct.registeredBy = msg.sender;
        
        newProduct.history.push(msg.sender);
    }

    // ÜRÜN TRANSFER FONKSİYONU 
    function transferProduct(string memory _serialNumber, address _newOwner) public onlyManufacturer {
        require(products[_serialNumber].registrationTimestamp != 0, "Product not found.");
        
        products[_serialNumber].history.push(_newOwner);
    }

    // ÜRÜN GEÇMİŞİNİ SORGULAMA FONKSİYONU (Tüketici için)
    function getProductHistory(string memory _serialNumber) public view returns (address[] memory) {
        require(products[_serialNumber].registrationTimestamp != 0, "Product not found.");
        
        return products[_serialNumber].history;
    }
}