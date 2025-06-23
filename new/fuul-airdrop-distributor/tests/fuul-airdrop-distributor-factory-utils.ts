import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  AirdropDistributorCreated,
  FeeCollectorUpdated,
  NativeFeeAmountUpdated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/FuulAirdropDistributorFactory/FuulAirdropDistributorFactory"

export function createAirdropDistributorCreatedEvent(
  contractId: BigInt,
  deployedAddress: Address,
  merkleRoot: Bytes,
  nativeFeeAmount: BigInt,
  currency: Address,
  verifier: Address,
  stakingContract: Address,
  claimingWithoutStakingPercentageFee: BigInt
): AirdropDistributorCreated {
  let airdropDistributorCreatedEvent = changetype<AirdropDistributorCreated>(
    newMockEvent()
  )

  airdropDistributorCreatedEvent.parameters = new Array()

  airdropDistributorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "contractId",
      ethereum.Value.fromUnsignedBigInt(contractId)
    )
  )
  airdropDistributorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deployedAddress",
      ethereum.Value.fromAddress(deployedAddress)
    )
  )
  airdropDistributorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "merkleRoot",
      ethereum.Value.fromFixedBytes(merkleRoot)
    )
  )
  airdropDistributorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "nativeFeeAmount",
      ethereum.Value.fromUnsignedBigInt(nativeFeeAmount)
    )
  )
  airdropDistributorCreatedEvent.parameters.push(
    new ethereum.EventParam("currency", ethereum.Value.fromAddress(currency))
  )
  airdropDistributorCreatedEvent.parameters.push(
    new ethereum.EventParam("verifier", ethereum.Value.fromAddress(verifier))
  )
  airdropDistributorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "stakingContract",
      ethereum.Value.fromAddress(stakingContract)
    )
  )
  airdropDistributorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "claimingWithoutStakingPercentageFee",
      ethereum.Value.fromUnsignedBigInt(claimingWithoutStakingPercentageFee)
    )
  )

  return airdropDistributorCreatedEvent
}

export function createFeeCollectorUpdatedEvent(
  newFeeCollector: Address
): FeeCollectorUpdated {
  let feeCollectorUpdatedEvent = changetype<FeeCollectorUpdated>(newMockEvent())

  feeCollectorUpdatedEvent.parameters = new Array()

  feeCollectorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFeeCollector",
      ethereum.Value.fromAddress(newFeeCollector)
    )
  )

  return feeCollectorUpdatedEvent
}

export function createNativeFeeAmountUpdatedEvent(
  newAmount: BigInt
): NativeFeeAmountUpdated {
  let nativeFeeAmountUpdatedEvent = changetype<NativeFeeAmountUpdated>(
    newMockEvent()
  )

  nativeFeeAmountUpdatedEvent.parameters = new Array()

  nativeFeeAmountUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAmount",
      ethereum.Value.fromUnsignedBigInt(newAmount)
    )
  )

  return nativeFeeAmountUpdatedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}
