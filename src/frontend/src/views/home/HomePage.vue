<template>
    <div class="common-layout">
        <el-container class="is-flex is-flex-direction-column">
            <el-header>
                <el-row>
                    <el-col :span="3"></el-col>
                    <el-col :span="12">
                        <router-link to="/home">
                            <div :class="['logo', 'is-flex', 'is-justify-content-left', {'logo--collapse': is_collapse}]">
                                <div :class="['logo__icon', {'logo__icon--collapse': is_collapse}]">e</div>
                                <div :class="['logo__text', {'logo__text--collapse': is_collapse}]">learning</div>
                            </div>
                        </router-link>
                    </el-col>
                    <el-col :span="5">
                        <div :class="['sign', 'is-flex', 'is-justify-content-right']">
                            <router-link to="/login">
                                <div :class="['sign__text']">Login</div>
                            </router-link>
                            <router-link to="/register">
                                <div :class="['sign__type', 'button is-light']">Sign up</div>
                            </router-link>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="3"></el-col>
                    <el-col :span="12">
                        <h1 :class="['title is-1', 'is-flex']">Take great online<br>Courses from anywhere<br>in the world</h1>
                        <p>Lorem ipsum dolor sit amet, consetetur<br>sadipscing elitr, sed diam nonumy eirmod<br>tempor Lorem ipsum dolor sit amet, consetetur</p>
                        <div :class="['sign', 'is-flex', 'is-justify-content-left', 'my-5']">
                            <router-link to="/register">
                                <div :class="['sign__type', 'button is-light']" style="width: 150px;">Get started</div>
                            </router-link>
                            <router-link to="/download">
                                <div :class="['sign__text']">Download now</div>
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <img style="float: right;" src="@/assets/vectors/app.svg"/>
                        <p style="text-align:center;"><img class="mt-5" width="100" src="@/assets/images/get-on-google-play.png"/></p>
                    </el-col>
                </el-row>
            </el-main>
            <footer class="footer">
                <div class="content has-text-centered">
                    <p>
                    <strong>PBL6</strong> E-Learing. The source code is licensed.
                    </p>
                </div>
            </footer>
        </el-container>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.common-layout{
    display: inline-block;
    width: 100%;
    min-height: 100vh;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #ffffff;
    padding: 40px 20px;

    .el-main {
        margin-top: 50px;
    }

    .logo {
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;

        &__icon {
            display: inline-block;
            height: 40px;
            width: 40px;
            background-color: #024547;
            border-radius: 10px;
            color: white;
        }

        &__text {
            display: inline-block;
            color: #024547;
            text-transform: capitalize;
            transition: visibility 0.1s, opacity 0.3s linear;
            margin-left: 10px;
            opacity: 1;
            overflow: hidden;

            &--collapse {
            display: none;
            opacity: 0;
            margin-left: 100px;
            }
        }

        &--collapse {
            margin: 30px 10px;
        }
    }
    .sign {
        font-size: 1rem;
        font-weight: 500;
        text-align: center;

        &__type {
            display: inline-block;
            height: 40px;
            width: 100px;
            background-color: #024547;
            border-radius: 60px;
            color: white;
        }

        &__text {
            margin: 10px 20px;
            display: inline-block;
            color: #024547;
            text-transform: capitalize;
            transition: visibility 0.1s, opacity 0.3s linear;
            opacity: 1;
            overflow: hidden;
        }
    }

    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
    }
}
</style>
