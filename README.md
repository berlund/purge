# Purge
![Node.js CI](https://github.com/berlund/purge/workflows/Node.js%20CI/badge.svg) [![codecov](https://codecov.io/gh/berlund/purge/branch/main/graph/badge.svg?token=0ZXzO4KFpj)](https://codecov.io/gh/berlund/purge)

## What is Purge
Purge is the **P**ractical and **U**seful **R**ecording **G**roup **E**raser. It serves only one purpose: to conveniently erase all existing recording groups on an [Axis S3008 Recorder](https://www.axis.com/en-us/products/s3008). Unless a recording group is currently in use, all existing recording groups will be removed using the Recording Groups API.

## Usage

### Installation

```
npm install -g @berlund/purge
```

### Run

The only required argument is the IP address of your S3008 recorder:

```bash
nvr-purge 192.168.1.22
```

Delete recording groups with custom credentials (HTTP Digest):
```bash
nvr-purge 192.168.1.22 -u username -p secret
```
