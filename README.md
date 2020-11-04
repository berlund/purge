# Purge

## What is Purge
Purge is the **P**ractical and **U**seful **R**ecording **G**roup **E**raser. It serves only one purpose: to conveniently erase all existing recording groups on an [Axis S3008 Recorder](https://www.axis.com/en-us/products/s3008). Unless a recording group is currently in use, all existing recording groups will be removed using the Recording Groups API.

## Usage

### Installation

```
npm install -g github:berlund/purge
```

### Run

The only required argument is the IP address of your recorder:

```bash
nvr-purge 192.168.1.22
```

Delete recording groups with custom credentials:
```bash
nvr-purge 192.168.1.22 -u username -p password
```

## Contributions
TBD
