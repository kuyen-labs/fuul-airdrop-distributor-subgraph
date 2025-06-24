import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Claimed,
  ClaimingWithoutStakingPercentageFeeUpdated,
  MerkleRootUpdated,
  MinimumTokenAmountForFeeUpdated,
  NativeFeeAmountUpdated,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SignatureVerificationDisabled,
  SignatureVerificationEnabled,
  StakingContractUpdated,
  TokensRemoved,
  Unpaused
} from "../generated/FuulAirdropDistributor/FuulAirdropDistributor"

export function createClaimedEvent(
  account: Address,
  amount: BigInt,
  claimedAmount: BigInt,
  season: i32
): Claimed {
  let claimedEvent = changetype<Claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "claimedAmount",
      ethereum.Value.fromUnsignedBigInt(claimedAmount)
    )
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "season",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(season))
    )
  )

  return claimedEvent
}

export function createClaimingWithoutStakingPercentageFeeUpdatedEvent(
  newFee: BigInt
): ClaimingWithoutStakingPercentageFeeUpdated {
  let claimingWithoutStakingPercentageFeeUpdatedEvent =
    changetype<ClaimingWithoutStakingPercentageFeeUpdated>(newMockEvent())

  claimingWithoutStakingPercentageFeeUpdatedEvent.parameters = new Array()

  claimingWithoutStakingPercentageFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("newFee", ethereum.Value.fromUnsignedBigInt(newFee))
  )

  return claimingWithoutStakingPercentageFeeUpdatedEvent
}

export function createMerkleRootUpdatedEvent(
  distributorMerkleRoot: Bytes
): MerkleRootUpdated {
  let merkleRootUpdatedEvent = changetype<MerkleRootUpdated>(newMockEvent())

  merkleRootUpdatedEvent.parameters = new Array()

  merkleRootUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "distributorMerkleRoot",
      ethereum.Value.fromFixedBytes(distributorMerkleRoot)
    )
  )

  return merkleRootUpdatedEvent
}

export function createMinimumTokenAmountForFeeUpdatedEvent(
  newAmount: BigInt
): MinimumTokenAmountForFeeUpdated {
  let minimumTokenAmountForFeeUpdatedEvent =
    changetype<MinimumTokenAmountForFeeUpdated>(newMockEvent())

  minimumTokenAmountForFeeUpdatedEvent.parameters = new Array()

  minimumTokenAmountForFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAmount",
      ethereum.Value.fromUnsignedBigInt(newAmount)
    )
  )

  return minimumTokenAmountForFeeUpdatedEvent
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

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
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

export function createSignatureVerificationDisabledEvent(): SignatureVerificationDisabled {
  let signatureVerificationDisabledEvent =
    changetype<SignatureVerificationDisabled>(newMockEvent())

  signatureVerificationDisabledEvent.parameters = new Array()

  return signatureVerificationDisabledEvent
}

export function createSignatureVerificationEnabledEvent(): SignatureVerificationEnabled {
  let signatureVerificationEnabledEvent =
    changetype<SignatureVerificationEnabled>(newMockEvent())

  signatureVerificationEnabledEvent.parameters = new Array()

  return signatureVerificationEnabledEvent
}

export function createStakingContractUpdatedEvent(
  newStakingContract: Address
): StakingContractUpdated {
  let stakingContractUpdatedEvent = changetype<StakingContractUpdated>(
    newMockEvent()
  )

  stakingContractUpdatedEvent.parameters = new Array()

  stakingContractUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newStakingContract",
      ethereum.Value.fromAddress(newStakingContract)
    )
  )

  return stakingContractUpdatedEvent
}

export function createTokensRemovedEvent(
  to: Address,
  amount: BigInt,
  tokenCurrency: Address
): TokensRemoved {
  let tokensRemovedEvent = changetype<TokensRemoved>(newMockEvent())

  tokensRemovedEvent.parameters = new Array()

  tokensRemovedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  tokensRemovedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  tokensRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenCurrency",
      ethereum.Value.fromAddress(tokenCurrency)
    )
  )

  return tokensRemovedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
