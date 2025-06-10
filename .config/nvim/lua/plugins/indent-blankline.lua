local x = {
    "lukas-reineke/indent-blankline.nvim",
    main = "ibl",
    --@module "ibl"
    --@type ibl.config
    opts = {},
    config = function()
        require('ibl').setup()
    end
}

return {}
