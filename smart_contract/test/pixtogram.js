const Pixtogram = artifacts.require("Pixtogram");
const { assert } = require("chai"); // Using Assert style
// const { expect } = require("chai"); // Using Expect style
// const { should } = require("chai"); // Using Should style
// should(); // Modifies `Object.prototype`

contract("Pixtogram", ([deployer, author, tipper]) => {
  let pixtogram;
  before(async () => {
    pixtogram = await Pixtogram.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await pixtogram.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      // console.log("address: ", address)
    });

    it("has a name", async () => {
      const name = await pixtogram.name();
      assert.equal(name, "Pixtogram");
    });
  });

  describe("register user", async () => {
    it("should register user", async () => {
      await pixtogram.registerUser("Stark", { from: author });
      const user = await pixtogram.users(author);
      assert.equal(user.username, "Stark");
      assert.equal(user.imgCount, 0);
      // console.log(user);
    });
  });

  describe("upload Image", async () => {
    let hash, description, result, user;
    before(async () => {
      hash = "hash";
      description = "description";
      await pixtogram.registerUser("Stark");
      user = await pixtogram.users(author);
      result = await pixtogram.uploadImage(hash, description, { from: author });
      // console.log(result.logs[0].args);
    });
    it("image upload", async () => {
      const image = await pixtogram.images(author, user.imgCount);
      // console.log(" images: ", images);
      assert.equal(image.id, 0);
      assert.equal(image.imgHash, hash);
      assert.equal(image.description, description);
      assert.equal(image.tipAmount, 0);
      assert.equal(image.author, author);
    });
    it("image created", async () => {
      const event = result.logs[0].args;
      assert.equal(event.id, 0);
      assert.equal(event.imgHash, hash);
      assert.equal(event.description, description);
      assert.equal(event.tipAmount, 0);
      assert.equal(event.author, author);
    });
    it("updated imgCount", async () => {
      const user = await pixtogram.users(author);
      assert.equal(user.imgCount, 1);
    });
  });

  describe("Tip Author", async () => {
    let hash, description, result, user;
    before(async () => {
      hash = "hash";
      description = "description";
      await pixtogram.registerUser("Stark");
      user = await pixtogram.users(author);
      result = await pixtogram.uploadImage(hash, description, { from: author });
      // console.log(result.logs[0].args);
    });
    it("tip", async () => {
      let oldAuthorbalance;
      oldAuthorbalance = await web3.eth.getBalance(author);
      oldAuthorbalance = new web3.utils.BN(oldAuthorbalance);

      const result = await pixtogram.tipAuthor(0, author, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      });
      // console.log(result);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), 0, "id is not correct");
      assert.equal(event.imgHash, hash, "Problem with imgHash");
      assert.equal(event.description, description);
      assert.equal(
        event.tipAmount,
        "1000000000000000000",
        "tip amount is incorrect"
      );
      assert.equal(event.author, author);

      let newAuthorbalance;
      newAuthorbalance = await web3.eth.getBalance(author);
      newAuthorbalance = new web3.utils.BN(newAuthorbalance);

      let tip;
      tip = web3.utils.toWei("1", "Ether");
      tip = new web3.utils.BN(tip);

      const expectedBalance = oldAuthorbalance.add(tip);

      assert.equal(
        newAuthorbalance.toString(),
        expectedBalance.toString(),
        "Balance not equal"
      );
      // console.log(newAuthorbalance.toString());
      // console.log(oldAuthorbalance.toString());
      // console.log(expectedBalance.toString());
    });
  });
});
