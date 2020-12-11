pragma solidity ^0.5.0;

contract Admin {
    struct Licence{
        uint id;
        string noLisensi;
        string namaMitra;
        string alamat;
        string tlp;
        string ipfsHash;
        string checksumFile;
    }

    mapping(uint => Licence) public licenses;
    mapping(string => Licence) licensesSt;
    uint public idCount = 0;
     
    event CreateTx(
        uint id,
        string noLisensi,
        string namaMitra,
        string alamat,
        string tlp,
        string ipfsHash,
        string checksumFile
    );
    

    function uploadTx(string memory _noLisensi, string memory _namaMitra, string memory _alamat, string memory _tlp, string memory _ipfsHash, string memory _checksumFile) public {
        
        idCount++;
        licenses [idCount] = Licence(idCount, _noLisensi, _namaMitra, _alamat, _tlp, _ipfsHash, _checksumFile);
        licensesSt [_noLisensi] = Licence(idCount, _noLisensi, _namaMitra, _alamat, _tlp, _ipfsHash, _checksumFile);
        licensesSt [_checksumFile] = Licence(idCount, _noLisensi, _namaMitra, _alamat, _tlp, _ipfsHash, _checksumFile);
        emit CreateTx(idCount, _noLisensi, _namaMitra, _alamat, _tlp, _ipfsHash, _checksumFile);
    }

    function getByNoLisensi(string memory _noLisensi) public view returns (uint, string memory, string memory, string memory, string memory, string memory, string memory){
        return(
            licensesSt[_noLisensi].id,
            _noLisensi,
            licensesSt[_noLisensi].namaMitra,
            licensesSt[_noLisensi].alamat,
            licensesSt[_noLisensi].tlp,
            licensesSt[_noLisensi].ipfsHash,
            licensesSt[_noLisensi].checksumFile
            );   
    } 
    
    function getByChecksum(string memory _checksumFile) public view returns (uint, string memory, string memory, string memory, string memory, string memory, string memory){
        return(
            licensesSt[_checksumFile].id,
            licensesSt[_checksumFile].noLisensi,
            licensesSt[_checksumFile].namaMitra,
            licensesSt[_checksumFile].alamat,
            licensesSt[_checksumFile].tlp,
            licensesSt[_checksumFile].ipfsHash,
            _checksumFile
            );   
    }    
}