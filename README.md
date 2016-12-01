# JSConf AU 2016: HyperJournal - A tamper-proof publishing system

## Errata

* __SHA-1__: I'm not sure I made it clear, but SHA-1 is not suitable as a hash function for new projects. It's might be necessary to use for existing system, eg. when working with git, but should be avoided for newer systems. SHA-1 SSL certificates are no longer valid. Even though [collisions cost upwards of $20K](https://sites.google.com/site/itstheshappening/) of computing power as of end 2015, there are better, faster crypto functions available, like SHA-256 and BLAKE2.

## Examples

Are located in the [`examples`](examples) folder.
Anything prefixed with `simple-*` is from the slides, while other files are more like what a real world implementation would be like. This is still toy models though.

## License

[ISC](LICENSE.md)
