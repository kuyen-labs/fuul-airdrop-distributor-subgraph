import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { AirdropDistributorCreated } from "../generated/schema"
import { AirdropDistributorCreated as AirdropDistributorCreatedEvent } from "../generated/FuulAirdropDistributorFactory/FuulAirdropDistributorFactory"
import { handleAirdropDistributorCreated } from "../src/fuul-airdrop-distributor-factory"
import { createAirdropDistributorCreatedEvent } from "./fuul-airdrop-distributor-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let contractId = BigInt.fromI32(234)
    let deployedAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let merkleRoot = Bytes.fromI32(1234567890)
    let nativeFeeAmount = BigInt.fromI32(234)
    let currency = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let verifier = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let stakingContract = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let claimingWithoutStakingPercentageFee = BigInt.fromI32(234)
    let newAirdropDistributorCreatedEvent =
      createAirdropDistributorCreatedEvent(
        contractId,
        deployedAddress,
        merkleRoot,
        nativeFeeAmount,
        currency,
        verifier,
        stakingContract,
        claimingWithoutStakingPercentageFee
      )
    handleAirdropDistributorCreated(newAirdropDistributorCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AirdropDistributorCreated created and stored", () => {
    assert.entityCount("AirdropDistributorCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AirdropDistributorCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contractId",
      "234"
    )
    assert.fieldEquals(
      "AirdropDistributorCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "deployedAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AirdropDistributorCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "merkleRoot",
      "1234567890"
    )
    assert.fieldEquals(
      "AirdropDistributorCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nativeFeeAmount",
      "234"
    )
    assert.fieldEquals(
      "AirdropDistributorCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "currency",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AirdropDistributorCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "verifier",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AirdropDistributorCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "stakingContract",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AirdropDistributorCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "claimingWithoutStakingPercentageFee",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
