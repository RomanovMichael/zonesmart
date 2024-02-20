<template lang="pug">
#app
    router-view
</template>

<script>
export default {
    name: "App",
}
</script>

<style lang="scss">
* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: Graphik, Montserrat, sans-serif;
    background-repeat: no-repeat;
}

html,
body {
    margin: 0;
    padding: 0;
    font-weight: normal;
    background-color: #f2f2f2;
    -webkit-font-smoothing: antialiased;
    color: $black;
    font-size: calc((100vw - 320px) / (1920 - 320) * (16 - 14) + 14px);
}

main {
    overflow: hidden;
    position: relative;
}

.tile {
    background-color: $white;
    border-radius: 1rem;
    box-shadow: 0 0.375rem 0.5rem 0 rgba(0, 0, 0, 0.16);
    margin: 0 auto;
    padding: 2.5rem 2.5rem 3.75rem;
}

h1,
h2,
h3,
p {
    margin: 0;
}

a {
    text-decoration: none;
}

button {
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
}

input {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    outline: none;
}

.input {
    &-example {
        position: relative;

        &:after {
            content: "";
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            bottom: -0.1em;
            background-repeat: no-repeat;
            background-image: url('data:image/svg+xml,<svg width="63" height="2" viewBox="0 0 63 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1H62.5" stroke="%23999999" stroke-dasharray="3 4"/></svg>');
        }
    }

    &-error {
        display: block;
        margin-top: 0.25rem;
        color: $error;
        font-size: 1rem;
        line-height: 1.562rem;
    }

    &-wrap {
        position: relative;
        height: 3.125rem;
        display: flex;
        flex-wrap: nowrap;
    }

    &.input--sm {
        & .input-wrap {
            height: 1.875rem;
            width: 8.375rem;
        }

        & .input-inner {
            padding: 0 0.625rem;
            border-color: #dee1e3;

            &:focus {
                border-color: rgb(19, 38, 57);
            }
        }
    }

    &-inner {
        border: 1px solid transparent;
        height: 100%;
        width: 100%;
        padding-left: 1.25rem;
        padding-right: 3.5rem;
        border-radius: 0.375rem;
        box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
        background-color: $button_gray;
        font-size: 1rem;
        transition: all 0.3s ease;

        &::placeholder {
            color: $gray;
        }

        &:focus {
            border-color: rgb(19, 38, 57);
        }

        &:disabled {
            background-color: #faf9fa;

            &::placeholder {
                color: #cececf;
                opacity: 0.4;
            }
        }
    }

    &-showpass {
        position: absolute;
        padding: 0.25rem;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
    }
}

.checkbox {
    cursor: pointer;

    input {
        display: none;

        &:checked {
            + {
                * {
                    > .checkbox-trigger {
                        border-color: transparent;
                        background-color: $green;
                        background-image: url('data:image/svg+xml,<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10L8.95 13L15 5" stroke="white" stroke-width="2"/></svg>');

                        &.checkbox-trigger--main {
                            background-image: url('data:image/svg+xml,<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10H14" stroke="white" stroke-width="2"/></svg>');
                        }
                    }
                }
            }

            &:hover {
                + {
                    * {
                        > .checkbox-trigger {
                            background-color: #2cc8b1;
                        }
                    }
                }
            }

            &:active {
                + {
                    * {
                        > .checkbox-trigger {
                            background-color: #29bda7;
                        }
                    }
                }
            }
        }
    }

    &:hover {
        .checkbox-trigger {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }

    &:active {
        .checkbox-trigger {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
}

.checkbox-trigger {
    width: 1.1875rem;
    height: 1.1875rem;
    background-color: $white;
    border: 1px solid rgb(153, 153, 153);
    transition: all ease 0.24s;
    background-repeat: no-repeat;
    border-radius: 0.375rem;
    background-position: center center;
}

.input-showpass {
    color: $gray;
    transition: color 0.3s ease;

    &:hover {
        color: $black;
        transition: color 0.3s ease;
    }
}

.btn {
    border-radius: 0.375rem;
    color: $white;
    transition: all 0.3s ease;
    padding: 1.125rem 1.875rem;
    font-size: 1rem;
    font-weight: 600;

    &:disabled {
        color: #cececf;
        background-color: $button_gray;
        pointer-events: none;
    }

    &--green {
        background-color: $green;

        &:hover {
            background-color: #2cc8b1;
        }

        &:active {
            background-color: #29bda7;
        }
    }
}

.link {
    color: $green;
    transition: all 0.3s ease;

    &.link--gray {
        color: $dark-blue;
    }

    &:hover {
        color: #20ebcd;
    }
}

h1 {
    font-size: 2.625rem;
    font-weight: 600;
}

h2 {
    font-size: 1.75rem;
    line-height: 1.5625rem;
    font-weight: 600;
}

h3 {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.5rem;
}

.caption {
    font-size: 0.75rem;
    line-height: 1rem;
    color: $gray;
}
</style>
